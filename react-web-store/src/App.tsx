import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom"
import StoreLogo from "./components/common/StoreLogo"
import UserNavBar from "./components/common/user-nav-bar/UserNavBar"
import CartPage from "./pages/CartPage"
import CategoryDetailsPage from "./pages/CategoryDetailsPage"
import CategoryPage from "./pages/CategoryPage"
import Home from "./pages/Home"
import SellItemsPage from "./pages/SellItemsPage"


const client = new QueryClient()

export default function App() {

  const Root = () => {
    return (
      <>
        <div className="bg-zinc-800 w-600 h-600">
          <UserNavBar />
        </div>

        <div className="grid grid-cols-3">
          <div className="flex-box justify-start text-center m-4">YOUR AD SPACE HERE</div>

          <div className="flex-box justify-start text-center m-4">
            <Outlet />
          </div>

          <div className="flex-box justify-end text-center m-4">YOUR AD SPACE HERE</div>
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
      </Route >
    )
  )


  return (
    <QueryClientProvider client={client}>
      <div className="flex-box relative">

        <RouterProvider router={router} />

      </div>
    </QueryClientProvider>

  )
}