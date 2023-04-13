import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom"
import UserNavBar from "./components/common/UserNavBar/UserNavBar"
import CartPage from "./pages/CartPage"
import CategoryDetailsPage from "./pages/CategoryDetailsPage"
import CategoryPage from "./pages/CategoryPage"
import Home from "./pages/Home"
import SellItemsPage from "./pages/SellItemsPage"
import { CartProvider } from "./hooks/CartContext"
import Register from "./pages/Register"
import Login from "./pages/Login"
import MyOffers from "./pages/MyOffers"
import SearchResult from "./pages/SearchResults"
import MyWishlist from "./pages/MyWishlist"
import EditMyOffers from "./pages/EditMyOffers"
import NotFound from "./pages/NotFound"
import { ROUTE_PATH } from "./utils/urls"


const client = new QueryClient()

export default function App() {

  const Root = () => {
    return (
      <>
        <div className="bg-zinc-800 w-600 h-600">
          <UserNavBar />
        </div>

        <div className="grid grid-cols-3">
          <div className="text-center text-lime-400 m-2">YOUR AD SPACE HERE</div>

          <div className="text-center m-2">
            <Outlet />
          </div>

          <div className="text-center text-lime-400 m-2">YOUR AD SPACE HERE</div>
        </div>
      </>
    )
  }


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={ROUTE_PATH.HOME} element={<Root />}>
        <Route index element={<Home />} />
        <Route path={ROUTE_PATH.SELL_ITEMS} element={<SellItemsPage />} />
        <Route path={ROUTE_PATH.CART} element={<CartPage />} />
        <Route path={ROUTE_PATH.CATEGORY_PAGE} element={<CategoryPage />} />
        <Route path={ROUTE_PATH.CATEGORY_ITEM_DETAILS} element={<CategoryDetailsPage />} />
        <Route path={ROUTE_PATH.REGISTER} element={<Register />} />
        <Route path={ROUTE_PATH.LOGIN} element={<Login />} />
        <Route path={ROUTE_PATH.SEARCH_ITEM_RESULT} element={<CategoryDetailsPage />} />
        <Route path={ROUTE_PATH.SEARCH_RESULTS} element={<SearchResult />} />
        <Route path={ROUTE_PATH.MY_OFFERS} element={<MyOffers />} />
        <Route path={ROUTE_PATH.MY_WISHLIST} element={<MyWishlist />} />
        <Route path={ROUTE_PATH.EDIT_OFFER} element={<EditMyOffers />} />
        <Route path={ROUTE_PATH.NOT_FOUND} element={<NotFound />} errorElement={<NotFound />} />
      </Route >
    )
  )


  return (
    <CartProvider>
      <QueryClientProvider client={client}>
        <div className="flex-box relative">

          <RouterProvider router={router} />

        </div>
      </QueryClientProvider>
    </ CartProvider>

  )
}