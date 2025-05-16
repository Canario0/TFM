import type { CustomError } from "@lib/entities/errors";

export function containsCode(
  error: unknown,
  code: string
): error is CustomError {
  return Boolean(
    typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === code
  );
}

export function translateRating(rating: number): number {
  return Math.round(rating / 2);
}
