import type { Icons } from "./icons";

export interface ProductSummary {
  id: string;
  name: string;
  icon: Icons;
  category: string;
  rating: number;
  price: number;
  maker: string;
  brand: string;
  model: string;
  description?: string;
}
