import React from "react";
import { Link } from "react-router-dom";

export default function SellItems() {




    return (
        <div>
            <Link to='/sell-items' className="inline-flex relative text-lime-400 w-28 h-14 mx-1 justify-center align-middle top-4 cursor-pointer hover:border-lime-400 hover:border hover:rounded">
                Sell Items
            </Link>
        </div>
    )
}