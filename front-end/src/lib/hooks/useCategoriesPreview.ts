import { API_ENDPOINTS } from "@lib/config/api";
import type { CategoryPreview } from "@lib/entities/categoryPreview";
import { InternalError } from "@lib/entities/errors";
import { containsCode } from "@lib/utils";
import { useEffect, useReducer } from "react";

interface CategoriesState {
  categories: CategoryPreview[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

interface SuccessAction {
  type: "SUCCESS";
  categories: CategoryPreview[];
}

interface LoadingAction {
  type: "LOADING";
}

interface ErrorAction {
  type: "ERROR";
  error: string;
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

function useCategoriesPreview(): [CategoriesState] {
  const [state, dispatch] = useReducer(categoriesReducer, initialState);
  useEffect(() => {
    const abortController = new AbortController();
    const fetchCategories = async () => {
      dispatch({ type: "LOADING" });
      try {
        const res = await fetch(API_ENDPOINTS.CATEGORIES, {
          signal: abortController.signal,
        });
        const data = await res.json();
        dispatch({ type: "SUCCESS", categories: data });
      } catch (error: unknown) {
        if (containsCode(error, InternalError.code)) {
          dispatch({ type: "ERROR", error: error.message });
        } else {
          dispatch({ type: "ERROR", error: "Error desconocido" });
        }
      }
    };
    fetchCategories();
    return () => abortController.abort();
  }, []);
  return [state];
}

export default useCategoriesPreview;
