import React from "react";
import { useNavigate } from "react-router-dom";
import { CategoryItemDetailsType } from "../../types";
import AddToCart from "./AddToCart";
import AddToWishlist from "./AddToWishlist";


type CategoryItemProps = CategoryItemDetailsType & {
    showDescription: boolean,
    categoryId?: string
}

export default function CategoryItem({ id, title, price, description, image, showDescription, categoryId }: CategoryItemProps) {

    const navigate = useNavigate()


    return (
        <div key={id} className="flex items-center flex-col p-5 m-5 border border-lime-700 rounded">
            <div className="bg-green-800 p-1 rounded text-lime-300">
                <span>{title}</span>
            </div>
            <div className="p-3">
                <img src={image} className="h-80 object-fill"></img>
            </div>
            {showDescription && <div><p className="bg-green-800 p-1 rounded text-lime-300">{description}</p> </div>}
            <div className="p-1 text-lime-300 space-x-1">
                <div className="inline-flex p-1 h-8 bg-green-800 rounded">{price}$</div>
                {!showDescription && <button className="p-1 rounded border border-lime-400  text-cyan-200 hover:text-cyan-100  cursor-pointer" onClick={() => {
                    navigate(`/categories/${categoryId}/${id}`)
                }}>Details</button>}
                <AddToWishlist title={title} price={price} description={description} imgUrl={image} />
                <AddToCart id={id}/>
            </div>
        </div>
    )


}