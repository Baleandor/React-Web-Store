import React from "react";
import StoreLogo from "../StoreLogo";
import SearchBar from "./SearchBar";
import SellItems from "./SellItems";
import ShoppingCart from "./ShoppingCart";
import UserProfile from "./UserProfile";


export default function UserNavBar() {
    return (
        <div className="flex h-20 justify-between">

            <StoreLogo />
            <SearchBar />
            <div className="flex">
                <UserProfile />
                <SellItems />
                <ShoppingCart />
            </div>

        </div>
    )


}