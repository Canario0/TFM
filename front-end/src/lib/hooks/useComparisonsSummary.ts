import { API_ENDPOINTS } from "@lib/config/api";
import {
  CustomError,
  InternalError,
  UnauthorizedError,
} from "@lib/entities/errors";
import { containsCode } from "@lib/utils";
import { useEffect, useReducer } from "react";
import { useAuth } from "./useAuth";

interface ComparisonsState {
  comparisons: { id: string; name: string; description?: string }[];
  loading: boolean;
  error: Error | null;
}

const initialState: ComparisonsState = {
  comparisons: [],
  loading: false,
  error: null,
};

interface SuccessAction {
  type: "SUCCESS";
  comparisons: { id: string; name: string; description?: string }[];
}

interface LoadingAction {
  type: "LOADING";
}

interface ErrorAction {
  type: "ERROR";
  error: Error;
}

type ComparisonsAction = SuccessAction | LoadingAction | ErrorAction;

function comparisonsReducer(
  state: ComparisonsState,
  action: ComparisonsAction
) {
  switch (action.type) {
    case "SUCCESS":
      return {
        ...state,
        comparisons: action.comparisons,
        loading: false,
        error: null,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

function handleError(error: unknown): Error {
  if (containsCode(error, UnauthorizedError.code)) {
    return new CustomError(error.code, error.message);
  }
  if (containsCode(error, InternalError.code)) {
    return new CustomError(error.code, error.message);
  }
  return new Error("Error al obtener las comparativas");
}

function useComparisonsSummary(): [ComparisonsState] {
  const [state, dispatch] = useReducer(comparisonsReducer, initialState);
  const auth = useAuth();
  useEffect(() => {
    const abortController = new AbortController();
    const fetchComparisons = async () => {
      dispatch({ type: "LOADING" });
      try {
        const res = await fetch(API_ENDPOINTS.COMPARISONS, {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (!res.ok) {
          const backError = await res.json();
          const error = handleError(backError);
          dispatch({ type: "ERROR", error });
        } else {
          const data = await res.json();
          dispatch({ type: "SUCCESS", comparisons: data });
        }
      } catch (error: unknown) {
        dispatch({ type: "ERROR", error: new Error("Error desconocido") });
      }
    };
    fetchComparisons();
    return () => abortController.abort();
  }, []);
  return [state];
}

export default useComparisonsSummary;
