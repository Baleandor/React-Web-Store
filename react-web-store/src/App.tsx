import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom"
import UserNavBar from "./components/common/user-nav-bar/UserNavBar"
import CartPage from "./pages/CartPage"
import CategoryDetailsPage from "./pages/CategoryDetailsPage"
import CategoryPage from "./pages/CategoryPage"
import Home from "./pages/Home"
import SellItemsPage from "./pages/SellItemsPage"
import { CartProvider } from "./hooks/CartContext"
import Register from "./pages/Register"
import Login from "./pages/Login"
import MyOffers from "./pages/MyOffers"
import SearchResult from "./pages/SearchResult"
import MyWishlist from "./pages/MyWishlist"


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
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
        <Route path='sell-items' element={<SellItemsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="categories/:category_id" element={<CategoryPage />} />
        <Route path="categories/:category_id/:item_id" element={<CategoryDetailsPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="search/:item_id" element={<CategoryDetailsPage />} />
        <Route path="search-result/:searchParams" element={<SearchResult />} />
        <Route path="my-offers" element={<MyOffers />} />
        <Route path="my-wishlist" element={<MyWishlist />} />
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