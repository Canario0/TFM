import { UserRole, type User } from "@lib/entities/user";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router";
import { jwtDecode, type JwtPayload as LibJwtPayload } from "jwt-decode";
import { API_ENDPOINTS } from "@lib/config/api";
import { containsCode } from "@lib/utils";
import {
  CustomError,
  InternalError,
  UnauthorizedError,
} from "@lib/entities/errors";

type JwtPayload = LibJwtPayload & {
  username: string;
  roles: string[];
};

type LoginCredentials = {
  username: string;
  password: string;
};

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  isAdmin: () => boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: true,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  isAdmin: () => false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
} as AuthContextType);

interface LoginAction {
  type: "LOGIN";
  token: string;
  user: User;
}

interface LogoutAction {
  type: "LOGOUT";
}

interface LoadingAction {
  type: "LOADING";
}

interface StopLoadingAction {
  type: "STOP_LOADING";
}

type AuthAction =
  | LoginAction
  | LogoutAction
  | LoadingAction
  | StopLoadingAction;

function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.token,
        user: action.user,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case "LOADING":
      return { ...state, loading: true };
    case "STOP_LOADING":
      return { ...state, loading: false };
    default:
      return state;
  }
}

function getUserFromToken(token: string): User {
  const payload = jwtDecode(token) as JwtPayload;
  if (!payload) throw new Error("Invalid token");
  const isExpired = !payload.exp || payload.exp * 1000 < Date.now();
  if (isExpired) throw new Error("Token expired");
  return {
    id: payload.sub,
    username: payload.username,
    roles: payload.roles,
  } as User;
}

function handleError(error: unknown) {
  if (containsCode(error, UnauthorizedError.code)) {
    throw new CustomError(error.code, error.message);
  }
  if (containsCode(error, InternalError.code)) {
    throw new CustomError(error.code, error.message);
  }
  throw new Error("Failed to login");
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      dispatch({ type: "LOADING" });
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No token found");
        dispatch({
          type: "LOGIN",
          token,
          user: getUserFromToken(token),
        });
      } catch {
        localStorage.removeItem("authToken");
        dispatch({ type: "LOGOUT" });
      }
    };
    checkAuth();
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const error = await res.json();
        handleError(error);
      }
      const { idToken } = await res.json();
      localStorage.setItem("authToken", idToken);
      dispatch({
        type: "LOGIN",
        token: idToken,
        user: getUserFromToken(idToken),
      });
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    const res = await fetch(API_ENDPOINTS.LOGOUT, {
      method: "POST",
      headers: { Authorization: `Bearer ${state.token}` },
    });
    if (!res.ok) {
      const error = await res.json();
      handleError(error);
    }
    localStorage.removeItem("authToken");
    navigate("/");
    dispatch({ type: "LOGOUT" });
  }, [state.token, navigate, dispatch]);

  const register = useCallback(async (credentials: LoginCredentials) => {
    const res = await fetch(API_ENDPOINTS.REGISTER, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      const error = await res.json();
      handleError(error);
    }
    dispatch({ type: "LOADING" });
  }, []);

  const isAdmin = useCallback((): boolean => {
    return Boolean(state.user && state.user.roles.includes(UserRole.ADMIN));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, isAdmin, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
