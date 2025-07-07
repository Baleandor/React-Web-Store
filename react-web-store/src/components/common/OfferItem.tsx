import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageWithLoading from "./ImageWithLoading";

type OfferItemProps = {
  item: any;
  handleDelete: (id: string) => void;
};

export default function OfferItem({ item, handleDelete }: OfferItemProps) {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div key={item.id} className="text-center place-items-center m-2 p-4 border border-lime-700 rounded">
      <ImageWithLoading
        src={item.imageurl}
        alt={item.title}
        className="w-60 h-52 m-4 rounded-lg border-2 border-lime-600"
        onLoad={() => setIsImageLoaded(true)}
        onError={() => setIsImageLoaded(true)} // Show content even if image fails
      />
      
      {/* Only show content when image is ready */}
      <div style={{ opacity: isImageLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <div className="text-lime-100">{item.title}</div>
        <div className="text-lime-100">${item.price}</div>
        <div className="inline-block space-x-2">
          <button
            className="p-1 border border-lime-400 text-cyan-200 rounded cursor-pointer hover:text-cyan-100"
            onClick={() => navigate(`/edit/${item.id}`)}
          >
            Edit
          </button>
          <button
            className="p-1 border border-lime-400 text-cyan-200 rounded cursor-pointer hover:text-cyan-100"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
        </div>
        <div className="text-lime-100">{item.description}</div>
      </div>
    </div>
  );
}
