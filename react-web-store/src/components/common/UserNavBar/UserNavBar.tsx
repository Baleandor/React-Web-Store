import React from "react";
import StoreLogo from "../StoreLogo";
import SearchBar from "./SearchBar";
import SellItems from "./SellItemsButton";
import ShoppingCart from "./ShoppingCart";
import UserProfile from "./UserProfile";

export default function UserNavBar() {
  return (
    <div className="grid grid-cols-3 h-20 w-full px-1 items-center">
      <div className="flex justify-start">
        <StoreLogo />
      </div>
      <div className="flex justify-center">
        <SearchBar />
      </div>
      <div className="flex justify-end items-center">
        <UserProfile />
        <SellItems />
        <ShoppingCart />
      </div>
    </div>
  );
}
