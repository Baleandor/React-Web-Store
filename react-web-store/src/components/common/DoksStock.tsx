import React, { useState } from "react";
import AddToWishlist from "./AddToWishlist";
import ImageWithLoading from "./ImageWithLoading";

type StockProps = {
  imgUrl: string;
  title: string;
  price: number;
  description: string;
};

export default function DoksStock({
  imgUrl,
  title,
  price,
  description,
}: StockProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="text-center place-items-center m-2 p-4 border border-lime-700 rounded">
      <ImageWithLoading
        src={imgUrl}
        alt={title}
        className="w-60 h-52 m-4 rounded-lg border-2 border-lime-600"
        onLoad={() => setIsImageLoaded(true)}
        onError={() => setIsImageLoaded(true)} // Show content even if image fails
      />
      
      {/* Only show content when image is ready */}
      <div style={{ opacity: isImageLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <div className="text-lime-100">{title}</div>
        <div className="text-lime-100">${price}</div>
        <div className="inline-block">
          <AddToWishlist
            imgUrl={imgUrl}
            title={title}
            price={price}
            description={description}
          />
        </div>
        <div className="text-lime-100">{description}</div>
      </div>
    </div>
  );
}
