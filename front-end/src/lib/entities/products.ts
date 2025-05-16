import type { Icons } from "./icons";
import type { Review } from "./review";

type Metadata = { key: string; value: string };

export interface ProductSubCategory {
  name: string;
  icon: Icons;
  metadata: Metadata[];
}

export interface Product {
  id: string;
  name: string;
  icon: Icons;
  category: string;
  rating: number;
  maker: string;
  brand: string;
  model: string;
  price: number;
  reviews: Review[];
  subCategories: ProductSubCategory[];
  description?: string;
}
