import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../supabase/client";
import { ROUTE_PATH } from "../../utils/urls";
import ShrekErrorBox from "./ShrekErrorBox";

type AddToWishlistProps = {
  description: string;
  imgUrl: string;
  title: string;
  price: number;
};

export default function AddToWishlist({
  description,
  imgUrl,
  title,
  price,
}: AddToWishlistProps) {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | undefined>(undefined);

  const handleAddToWishlist = async () => {
    try {
      const { data, error } = await supabaseClient.auth.getSession();

      if (error) {
        setMessage(error.message);
        return;
      }

      if (!data.session?.user) {
        navigate(ROUTE_PATH.LOGIN);
        return;
      }

      // Get current user data
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      if (!user) {
        setMessage("User not authenticated");
        return;
      }

      // Get current wishlist from user metadata
      const currentWishlist = user.user_metadata?.wishlist || [];

      // Check if item already exists in wishlist
      const itemExists = currentWishlist.some(
        (item: any) => item.title === title && item.imageurl === imgUrl
      );

      if (itemExists) {
        setMessage("Item already in wishlist!");
        return;
      }

      // Create new wishlist item with unique ID
      const newWishlistItem = {
        id: crypto.randomUUID(),
        title: title,
        price: price,
        description: description,
        imageurl: imgUrl,
      };

      // Add new item to the wishlist array
      const updatedWishlist = [...currentWishlist, newWishlistItem];

      // Update user metadata with new wishlist array
      const { error: updateError } = await supabaseClient.auth.updateUser({
        data: {
          ...user.user_metadata,
          wishlist: updatedWishlist,
        },
      });

      if (updateError) {
        setMessage(updateError.message);
      } else {
        setMessage(undefined);
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <>
      <button
        className="p-1 border border-lime-400 text-cyan-200 rounded cursor-pointer hover:text-cyan-100"
        onClick={handleAddToWishlist}
      >
        Wishlist
      </button>
      <ShrekErrorBox errorMessage={message} />
    </>
  );
}
