import { API_ENDPOINTS } from "@lib/config/api";
import type { CategorySummary } from "@lib/entities/categorySummary";
import {
  CustomError,
  InternalError,
  UnauthorizedError,
} from "@lib/entities/errors";
import { containsCode } from "@lib/utils";
import { useEffect, useReducer } from "react";

interface CategoriesState {
  categories: CategorySummary[];
  loading: boolean;
  error: Error | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

interface SuccessAction {
  type: "SUCCESS";
  categories: CategorySummary[];
}

interface LoadingAction {
  type: "LOADING";
}

interface ErrorAction {
  type: "ERROR";
  error: Error;
}

type CategoriesAction = SuccessAction | LoadingAction | ErrorAction;

function categoriesReducer(state: CategoriesState, action: CategoriesAction) {
  switch (action.type) {
    case "SUCCESS":
      return {
        ...state,
        categories: action.categories,
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
  return new Error("Error al obtener los productos");
}

function useCategoriesSummary(): [CategoriesState] {
  const [state, dispatch] = useReducer(categoriesReducer, initialState);
  useEffect(() => {
    const abortController = new AbortController();
    const fetchCategories = async () => {
      dispatch({ type: "LOADING" });
      try {
        const res = await fetch(API_ENDPOINTS.CATEGORIES, {
          signal: abortController.signal,
        });
        if (!res.ok) {
          const backError = await res.json();
          const error = handleError(backError);
          dispatch({ type: "ERROR", error });
        } else {
          const data = await res.json();
          dispatch({ type: "SUCCESS", categories: data });
        }
      } catch (error: unknown) {
        dispatch({ type: "ERROR", error: new Error("Error desconocido") });
      }
    };
    fetchCategories();
    return () => abortController.abort();
  }, []);
  return [state];
}

export default useCategoriesSummary;
