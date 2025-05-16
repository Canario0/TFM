import type { User } from "./user";

export interface Review {
  user: Pick<User, "id" | "username">;
  rating: number;
  comment: string;
}
