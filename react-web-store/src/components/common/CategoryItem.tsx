import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CategoryItemDetailsType } from "../../types";


type CategoryItemProps = CategoryItemDetailsType & {
    showDescription: boolean,
    categoryId?: string
}

export default function CategoryItem({ id, title, price, description, image, showDescription, categoryId }: CategoryItemProps) {

    const navigate = useNavigate()


    return (
        <div key={id} className="flex items-center flex-col p-5 m-5 border border-lime-700 rounded">
            <div className="bg-lime-800 p-1 rounded text-lime-300">
                <span>{title}</span>
            </div>
            <div className="p-3">
                <img src={image} className="h-80 object-fill"></img>
            </div>
            {showDescription && <div><p className="bg-lime-800 p-1 rounded text-lime-300">{description}</p> </div>}
            <div className="p-1 text-lime-300 space-x-1">
                <span className="p-1 bg-lime-800 rounded">{price}$</span>
                {!showDescription && <button className="p-1 bg-lime-800 rounded cursor-pointer" onClick={() => {
                    navigate(`/categories/${categoryId}/${id}`)
                }}>Details</button>}
                <button className="p-1 bg-lime-800 rounded cursor-pointer">Whishlist</button>
                <button className="p-1 bg-lime-800 rounded cursor-pointer">Cart</button>
            </div>
        </div>
    )


}