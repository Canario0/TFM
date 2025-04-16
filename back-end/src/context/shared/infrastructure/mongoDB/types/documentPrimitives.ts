import { Primitives } from "@codelytv/primitives-type";

export type DocumentPrimitives<T> = {
  [K in keyof Primitives<T> as K extends 'id' ? '_id' : K]: T[K];
};
