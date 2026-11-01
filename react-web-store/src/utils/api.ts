import type { Product } from "../types";

const FAKE_STORE_URL = "https://fakestoreapi.com/products";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${FAKE_STORE_URL}${path}`);
  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`,
    );
  }
  // The API answers unknown product ids with 200 and an empty body.
  const body = await response.text();
  return (body ? JSON.parse(body) : null) as T;
}

export const getCategories = () => request<string[]>("/categories");

export const getCategoryProducts = (category: string) =>
  request<Product[]>(`/category/${encodeURIComponent(category)}`);

export const getProduct = (id: string) =>
  request<Product | null>(`/${encodeURIComponent(id)}`);

export const getAllProducts = () => request<Product[]>("");
