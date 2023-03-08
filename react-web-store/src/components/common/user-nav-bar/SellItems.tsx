import React from "react";
import { Link } from "react-router-dom";

export default function SellItems() {

    return (
        <div>
            <Link to='/sell-items' className="inline-flex relative text-lime-400 w-28 h-14 mx-1 p-1 justify-center top-4 cursor-pointer hover:border-lime-400 hover:border hover:rounded">
                <span className="self-center text-xl">Sell Items</span>
            </Link>
        </div>
    )
}