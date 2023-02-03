import React from "react"
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom"
import UserNavBar from "./components/common/user-nav-bar/UserNavBar"
import CartPage from "./pages/CartPage"
import Home from "./pages/Home"
import SellItemsPage from "./pages/SellItemsPage"

export default function App() {

  const cart = new Map
  //   const addToCart = (e) => {
  //     if(cart.contains(e.target.id)){
  // check if item already exists and increase its number

  //     }
  // cart.push(e.target.id)
  //   }


  const Root = () => {
    return (
      <>
        <div className="bg-zinc-800 w-600 h-600">
          <UserNavBar />
        </div>

        <div className="grid grid-cols-3">
          <div className="flex-box justify-start text-center m-4">YOUR AD SPACE HERE</div>

          <Outlet />

          <div className="flex-box justify-end text-center m-4">YOUR AD SPACE HERE</div>
        </div>
      </>
    )
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Home />}></Route>
        <Route path='/sell-items' element={<SellItemsPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
      </Route >
    )
  )


  return (
    <div className="flex-box relative">

      <RouterProvider router={router} />

    </div>
  )
}