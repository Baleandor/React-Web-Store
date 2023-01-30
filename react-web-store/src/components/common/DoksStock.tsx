import React from "react";

export default function DoksStock({ imgUrl, title, price, description }) {

    return (
        <div className=" text-center place-items-center m-2">
            <img src={imgUrl} className="w-60 h-52 m-4 inline border-2 border-lime-600"></img>
            <div className="text-lime-400">{title}</div>
            <div className="text-lime-400">${price}</div>
            <div className="text-lime-400">{description}</div>

        </div>
    )
}