import type { Location } from "react-router";

export const ROUTES = {
  HOME: "/",
  CATEGORY: "/categories/:categoryName",
  PRODUCT: "/products/:productId",
  SEARCH: "/search",
  CART: "/cart",
  LOGIN: "/login",
  REGISTER: "/register",
  SELL: "/sell",
  MY_OFFERS: "/my-offers",
  EDIT_OFFER: "/my-offers/:offerId/edit",
  MY_WISHLIST: "/my-wishlist",
} as const;

export const paths = {
  category: (name: string) => `/categories/${encodeURIComponent(name)}`,
  product: (id: number) => `/products/${id}`,
  search: (query: string) => `/search?q=${encodeURIComponent(query)}`,
  editOffer: (id: string) => `/my-offers/${id}/edit`,
};

/** Router state carried to the auth pages so they can send the user back. */
export type AuthRedirectState = { from?: Partial<Location> } | null;

/** The full path (including query and hash) the user was sent to log in from, or home. */
export function getRedirectPath(state: unknown): string {
  const from = (state as AuthRedirectState)?.from;
  if (!from?.pathname) return ROUTES.HOME;
  return `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`;
}
