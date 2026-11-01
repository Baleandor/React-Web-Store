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
