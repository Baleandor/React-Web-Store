import type { Product } from "../types";

/** Case-insensitive match on title or category. Shared by the search bar and results page. */
export function matchesQuery(
  product: Pick<Product, "title" | "category">,
  query: string,
): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return false;
  return (
    product.title.toLowerCase().includes(needle) ||
    product.category.toLowerCase().includes(needle)
  );
}
