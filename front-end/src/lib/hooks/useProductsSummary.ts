import { API_ENDPOINTS } from "@lib/config/api";
import {
  CustomError,
  InternalError,
  UnauthorizedError,
} from "@lib/entities/errors";
import type { ProductSummary } from "@lib/entities/productSummary";
import { containsCode } from "@lib/utils";
import { useEffect, useReducer } from "react";

interface ProductsState {
  products: ProductSummary[];
  loading: boolean;
  error: Error | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

interface SuccessAction {
  type: "SUCCESS";
  products: ProductSummary[];
}

interface LoadingAction {
  type: "LOADING";
}

interface ErrorAction {
  type: "ERROR";
  error: Error;
}

type ProductsAction = SuccessAction | LoadingAction | ErrorAction;

function productsReducer(state: ProductsState, action: ProductsAction) {
  switch (action.type) {
    case "SUCCESS":
      return {
        ...state,
        products: action.products,
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

function useProductsSummary(): [ProductsState] {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  useEffect(() => {
    const abortController = new AbortController();
    const fetchProducts = async () => {
      dispatch({ type: "LOADING" });
      try {
        const res = await fetch(API_ENDPOINTS.PRODUCTS, {
          signal: abortController.signal,
        });
        if (!res.ok) {
          const backError = await res.json();
          const error = handleError(backError);
          dispatch({ type: "ERROR", error });
        } else {
          const data = await res.json();
          dispatch({ type: "SUCCESS", products: data });
        }
      } catch (error: unknown) {
        dispatch({ type: "ERROR", error: new Error("Error desconocido") });
      }
    };
    fetchProducts();
    return () => abortController.abort();
  }, []);
  return [state];
}

export default useProductsSummary;
