import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../supabase/client";
import LoadingBox from "../components/common/LoadingBox";
import ImageWithLoading from "../components/common/ImageWithLoading";
import { ROUTE_PATH } from "../utils/urls";
import ShrekErrorBox from "../components/common/ShrekErrorBox";

// Define proper types
interface WishlistItem {
  id: string;
  title: string;
  price: number;
  description: string;
  imageurl: string;
}

// Create a separate component for wishlist items
function WishlistItemComponent({ item, handleDelete }: { item: WishlistItem; handleDelete: (id: string) => void }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      key={item.id}
      className="text-center place-items-center m-2 p-4 border border-lime-700 rounded"
    >
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
        <div className="inline-block">
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

export default function MyWishlist() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | undefined>(undefined);

  // Query for user authentication and data
  const {
    data: userInfo,
    isFetching,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => supabaseClient.auth.getUser(),
    retry: 1,
  });

  const userId = userInfo?.data.user?.id;
  const wishlist: WishlistItem[] =
    userInfo?.data.user?.user_metadata?.wishlist || [];

  // Handle authentication error
  useEffect(() => {
    if (userError) {
      setMessage(
        userError instanceof Error
          ? userError.message
          : "An error occurred while fetching your wishlist"
      );
    }
  }, [userError]);

  // Navigate to login if user is not authenticated
  useEffect(() => {
    if (!userId && !isFetching && userInfo) {
      navigate(ROUTE_PATH.LOGIN);
    }
  }, [userId, isFetching, userInfo, navigate]);

  // Handle item deletion
  const handleDelete = useCallback(
    async (id: string) => {
      try {
        setMessage(undefined); // Clear any existing messages

        const {
          data: { user },
        } = await supabaseClient.auth.getUser();

        if (!user) {
          setMessage("User not authenticated");
          return;
        }

        // Get current wishlist from user metadata
        const currentWishlist = user.user_metadata?.wishlist || [];

        // Filter out the item to delete
        const updatedWishlist = currentWishlist.filter(
          (item: WishlistItem) => item.id !== id
        );

        // Update user metadata with filtered wishlist array
        const { error } = await supabaseClient.auth.updateUser({
          data: {
            ...user.user_metadata,
            wishlist: updatedWishlist,
          },
        });

        if (error) {
          setMessage(error.message);
        } else {
          setMessage(undefined);
          // Refresh the user data to update the metadata
          refetchUser();
        }
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while removing the item"
        );
      }
    },
    [refetchUser]
  );

  // Show loading state
  if (isFetching) {
    return (
      <div className="p-2 m-2 text-lime-300 flex flex-col text-center">
        <LoadingBox />
      </div>
    );
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!userId) {
    return null;
  }

  return (
    <div className="p-2 m-2 text-lime-300 flex flex-col text-center">
      {wishlist.length > 0 ? (
        wishlist.map((item: WishlistItem) => (
          <WishlistItemComponent 
            key={item.id} 
            item={item} 
            handleDelete={handleDelete} 
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center p-8">
          <p className="text-center text-lime-200 text-2xl font-bold mb-4">
            No items in wishlist
          </p>
          <button
            onClick={() => navigate("/")}
            className="p-1 border border-lime-400 text-cyan-200 rounded cursor-pointer hover:text-cyan-100"
          >
            Browse Items
          </button>
        </div>
      )}

      <ShrekErrorBox errorMessage={message} />
    </div>
  );
}
