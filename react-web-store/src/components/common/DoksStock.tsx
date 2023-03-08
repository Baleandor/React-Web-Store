import React from "react";

type StockProps = {
    imgUrl: string,
    title: string,
    price: number,
    description: string
}

export default function DoksStock({ imgUrl, title, price, description }: StockProps) {

    return (
        <div className=" text-center place-items-center m-2">
            <img src={imgUrl} className="w-60 h-52 m-4 inline border-2 border-lime-600"></img>
            <div className="text-lime-400">{title}</div>
            <div className="text-lime-400">${price}</div>
            <div className="inline-block">
                <button className="bg-lime-400 mx-2 rounded-sm p-1">Add to Wishlist</button>
                <button className="bg-lime-400 rounded-sm p-1">Cart</button>
            </div>
            <div className="text-lime-400">{description}</div>

        </div>
    )
}