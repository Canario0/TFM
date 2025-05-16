import type { Product } from "./products";

export interface Comparison {
  id?: string;
  ownerId: string;
  name: string;
  description?: string;
  products: Product[];
}
