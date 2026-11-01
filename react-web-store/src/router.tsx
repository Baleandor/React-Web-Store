import type { ComponentType } from "react";
import { createBrowserRouter, type RouteObject } from "react-router";
import Layout from "./components/layout/Layout";
import RequireAuth from "./components/layout/RequireAuth";
import RouteError from "./components/layout/RouteError";
import Spinner from "./components/ui/Spinner";
import { ROUTES } from "./utils/routes";

// Each page is code-split into its own chunk.
const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
});

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    Component: Layout,
    ErrorBoundary: RouteError,
    HydrateFallback: Spinner,
    children: [
      { index: true, lazy: page(() => import("./pages/HomePage")) },
      {
        path: ROUTES.CATEGORY,
        lazy: page(() => import("./pages/CategoryPage")),
      },
      { path: ROUTES.PRODUCT, lazy: page(() => import("./pages/ProductPage")) },
      { path: ROUTES.SEARCH, lazy: page(() => import("./pages/SearchPage")) },
      { path: ROUTES.CART, lazy: page(() => import("./pages/CartPage")) },
      { path: ROUTES.LOGIN, lazy: page(() => import("./pages/LoginPage")) },
      {
        path: ROUTES.REGISTER,
        lazy: page(() => import("./pages/RegisterPage")),
      },
      {
        Component: RequireAuth,
        children: [
          { path: ROUTES.SELL, lazy: page(() => import("./pages/SellPage")) },
          {
            path: ROUTES.MY_OFFERS,
            lazy: page(() => import("./pages/MyOffersPage")),
          },
          {
            path: ROUTES.EDIT_OFFER,
            lazy: page(() => import("./pages/EditOfferPage")),
          },
          {
            path: ROUTES.MY_WISHLIST,
            lazy: page(() => import("./pages/MyWishlistPage")),
          },
        ],
      },
      { path: "*", lazy: page(() => import("./pages/NotFoundPage")) },
    ],
  },
];

export const router = createBrowserRouter(routes);
