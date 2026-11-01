import { useRequireLogin } from "../../hooks/useRequireLogin";
import { useUpdateUserList } from "../../hooks/useUserList";
import { useNotify } from "../../hooks/useNotify";
import type { ListingInput } from "../../types";

type AddToWishlistButtonProps = {
  item: ListingInput;
};

export default function AddToWishlistButton({
  item,
}: AddToWishlistButtonProps) {
  const notify = useNotify();
  const requireLogin = useRequireLogin();
  const updateWishlist = useUpdateUserList("wishlist");

  const handleClick = () =>
    requireLogin(() => {
      let alreadySaved = false;

      updateWishlist.mutate(
        (wishlist) => {
          alreadySaved = wishlist.some(
            (saved) =>
              saved.title === item.title && saved.imageurl === item.imageurl,
          );
          return alreadySaved
            ? wishlist
            : [...wishlist, { id: crypto.randomUUID(), ...item }];
        },
        {
          onSuccess: () =>
            alreadySaved
              ? notify.error("Dat's already in yer wishlist!")
              : notify.success("Added to wishlist"),
          onError: notify.error,
        },
      );
    });

  return (
    <button
      type="button"
      className="btn"
      onClick={handleClick}
      disabled={updateWishlist.isPending}
    >
      ♥ Wishlist
    </button>
  );
}
