import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryItemDetailsType } from "../../types";
import AddToCart from "./AddToCart";
import AddToWishlist from "./AddToWishlist";
import ImageWithLoading from "./ImageWithLoading";


type CategoryItemProps = CategoryItemDetailsType & {
    showDescription: boolean,
    categoryId?: string
}

export default function CategoryItem({ id, title, price, description, image, showDescription, categoryId }: CategoryItemProps) {

    const navigate = useNavigate()
    const [isImageLoaded, setIsImageLoaded] = useState(false);


    return (
        <div key={id} className="text-center place-items-center m-2 p-4 border border-lime-700 rounded">
            <ImageWithLoading
                src={image}
                alt={title}
                className="w-60 h-52 m-4 rounded-lg border-2 border-lime-600"
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setIsImageLoaded(true)} // Show content even if image fails
            />
            
            {/* Only show content when image is ready */}
            <div style={{ opacity: isImageLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                <div className="text-lime-100">{title}</div>
                <div className="text-lime-100">${price}</div>
                <div className="inline-block space-x-2">
                    {!showDescription && (
                        <button 
                            className="p-1 border border-lime-400 text-cyan-200 rounded cursor-pointer hover:text-cyan-100" 
                            onClick={() => navigate(`/categories/${categoryId}/${id}`)}
                        >
                            Details
                        </button>
                    )}
                    <AddToWishlist title={title} price={price} description={description} imgUrl={image} />
                    <AddToCart id={id} />
                </div>
                {showDescription && <div className="text-lime-100">{description}</div>}
            </div>
        </div>
    )


}