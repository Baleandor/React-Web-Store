import React from "react";
import StoreLogo from "../StoreLogo";
import SearchBar from "./SearchBar";
import SellItems from "./SellItemsButton";
import ShoppingCart from "./ShoppingCart";
import UserProfile from "./UserProfile";

export default function UserNavBar() {
  return (
    <div className="flex h-20 w-full px-1">
      <div className="flex-shrink-0 self-start">
        <StoreLogo />
      </div>
      <div className="flex-1 flex justify-center px-4">
        <SearchBar />
      </div>
      <div className="flex flex-shrink-0 self-end">
        <UserProfile />
        <SellItems />
        <ShoppingCart />
      </div>
    </div>
  );
}
