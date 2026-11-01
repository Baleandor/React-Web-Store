import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getCategories,
  getCategoryProducts,
  getProduct,
} from "../utils/api";

const STALE_TIME = 5 * 60 * 1000;

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: STALE_TIME,
  });

export const useCategoryProducts = (category: string) =>
  useQuery({
    queryKey: ["products", "category", category],
    queryFn: () => getCategoryProducts(category),
    staleTime: STALE_TIME,
  });

export const useProduct = (id: string) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
    staleTime: STALE_TIME,
  });

export const useAllProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: STALE_TIME,
  });
