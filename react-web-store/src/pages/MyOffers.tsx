import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../supabase/client";
import OfferItem from "../components/common/OfferItem";
import LoadingBox from "../components/common/LoadingBox";
import { ROUTE_PATH } from "../utils/urls";
import ShrekErrorBox from "../components/common/ShrekErrorBox";

// Define proper types
interface Offer {
  id: string;
  title: string;
  price: number;
  description: string;
  imageurl: string;
}

export default function MyOffers() {
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
  const offers: Offer[] = userInfo?.data.user?.user_metadata?.offers || [];

  // Handle authentication error
  useEffect(() => {
    if (userError) {
      setMessage(
        userError instanceof Error
          ? userError.message
          : "An error occurred while fetching your offers"
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

        // Get current offers from user metadata
        const currentOffers = user.user_metadata?.offers || [];

        // Filter out the item to delete
        const updatedOffers = currentOffers.filter(
          (offer: Offer) => offer.id !== id
        );

        // Update user metadata with filtered offers array
        const { error } = await supabaseClient.auth.updateUser({
          data: {
            ...user.user_metadata,
            offers: updatedOffers,
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
            : "An unexpected error occurred while deleting the item"
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
      {offers.length > 0 ? (
        offers.map((item: Offer) => (
          <OfferItem key={item.id} item={item} handleDelete={handleDelete} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center p-8">
          <p className="text-center text-lime-200 text-2xl font-bold mb-4">
            No offers found
          </p>
          <button
            onClick={() => navigate(`/${ROUTE_PATH.SELL_ITEMS}`)}
            className="p-1 border border-lime-400 text-cyan-200 rounded cursor-pointer hover:text-cyan-100"
          >
            Create Your First Offer
          </button>
        </div>
      )}

      <ShrekErrorBox errorMessage={message} />
    </div>
  );
}
