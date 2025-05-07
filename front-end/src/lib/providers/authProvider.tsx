import type { User } from "@lib/entities/user";
import { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router";
import { jwtDecode, type JwtPayload as LibJwtPayload } from "jwt-decode";

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
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
};

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

  const login = async (credentials: LoginCredentials) => {
    const res = await fetch("/v1/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });
    // TODO: handle error
    if (!res.ok) throw new Error("Failed to login");
    const { idToken } = await res.json();
    localStorage.setItem("authToken", idToken);
    dispatch({
      type: "LOGIN",
      token: idToken,
      user: getUserFromToken(idToken),
    });
  };

  const logout = async () => {
    const res = await fetch("/v1/users/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${state.token}` },
    });
    // TODO: handle error
    if (!res.ok) throw new Error("Failed to logout");
    localStorage.removeItem("authToken");
    navigate("/");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
