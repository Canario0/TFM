import { API_ENDPOINTS } from "@lib/config/api";
import type { Comparison } from "@lib/entities/comparison";
import {
  CustomError,
  InternalError,
  UnauthorizedError,
} from "@lib/entities/errors";
import type { Product } from "@lib/entities/products";
import { containsCode } from "@lib/utils";
import { useCallback, useReducer } from "react";

interface ComparisonState {
  comparison: Comparison | null;
  loading: boolean;
  error: Error | null;
}

const initialState: ComparisonState = {
  comparison: null,
  loading: false,
  error: null,
};

interface SuccessAction {
  type: "SUCCESS";
  comparison: Comparison;
}

interface LoadingAction {
  type: "LOADING";
}

interface ErrorAction {
  type: "ERROR";
  error: Error;
}

type ComparisonAction = SuccessAction | LoadingAction | ErrorAction;

function comparisonReducer(state: ComparisonState, action: ComparisonAction) {
  switch (action.type) {
    case "SUCCESS":
      return {
        ...state,
        comparison: action.comparison,
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
  return new Error("Error al obtener la comparativa");
}

async function fetchComparison(id: string, token: string) {
  const res = await fetch(API_ENDPOINTS.COMPARISON.replace(":id", id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const backError = await res.json();
    const error = handleError(backError);
    throw error;
  }
  const data = (await res.json()) as Pick<
    Comparison,
    "id" | "name" | "description" | "ownerId"
  > & { productIds: string[] };
  return data;
}

async function fetchProducts(productIds: string[]) {
  const products = await Promise.all(
    productIds.map(async (id) => {
      const res = await fetch(API_ENDPOINTS.PRODUCT.replace(":id", id));
      if (!res.ok) {
        const backError = await res.json();
        const error = handleError(backError);
        throw error;
      }
      return res.json();
    })
  );
  return products;
}

function useComparison(): [
  ComparisonState,
  {
    addProduct: (productId: string) => void;
    removeProduct: (product: Product) => void;
    updateName: (name: string) => void;
    updateDescription: (description: string) => void;
    save: (token: string) => void;
    load: (id?: string, productIds?: string[], token?: string) => void;
  }
] {
  const [state, dispatch] = useReducer(comparisonReducer, initialState);

  const load = useCallback(
    async (id?: string, productIds?: string[], token?: string) => {
      dispatch({ type: "LOADING" });
      if (state.comparison != null) {
        dispatch({ type: "SUCCESS", comparison: state.comparison });
        return;
      }
      if (!id) {
        const products = await fetchProducts(productIds ?? []);
        dispatch({
          type: "SUCCESS",
          comparison: {
            id: undefined,
            ownerId: "",
            name: "",
            products: products,
          },
        });
        return;
      }
      try {
        if (!token) {
          return;
        }
        const comparison = await fetchComparison(id, token);
        const products = await fetchProducts(comparison.productIds);
        dispatch({
          type: "SUCCESS",
          comparison: {
            ...comparison,
            products: products,
          },
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          dispatch({ type: "ERROR", error });
        } else {
          dispatch({ type: "ERROR", error: new Error("Error desconocido") });
        }
      }
    },
    [state.comparison, dispatch]
  );

  const addProduct = useCallback(
    async (productId: string) => {
      const res = await fetch(API_ENDPOINTS.PRODUCT.replace(":id", productId));
      if (!res.ok) {
        return;
      }
      const product = await res.json();
      const newComparison: Comparison = {
        ...state.comparison!,
        products: [...state.comparison!.products, product],
      };
      dispatch({
        type: "SUCCESS",
        comparison: newComparison,
      });
    },
    [state.comparison, dispatch]
  );

  const removeProduct = useCallback(
    (product: Product) => {
      const newComparison: Comparison = {
        ...state.comparison!,
        products: state.comparison!.products.filter((p) => p.id !== product.id),
      };
      dispatch({
        type: "SUCCESS",
        comparison: newComparison,
      });
    },
    [state.comparison, dispatch]
  );

  const updateName = useCallback(
    (name: string) => {
      const newComparison: Comparison = {
        ...state.comparison!,
        name: name,
      };
      dispatch({
        type: "SUCCESS",
        comparison: newComparison,
      });
    },
    [state.comparison, dispatch]
  );

  const updateDescription = useCallback(
    (description: string) => {
      const newComparison: Comparison = {
        ...state.comparison!,
        description: description,
      };
      dispatch({
        type: "SUCCESS",
        comparison: newComparison,
      });
    },
    [state.comparison, dispatch]
  );

  const save = useCallback((token: string) => {}, [state]);

  return [
    state,
    { addProduct, removeProduct, updateName, updateDescription, load, save },
  ];
}

export default useComparison;
