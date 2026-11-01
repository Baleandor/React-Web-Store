import { Link } from "react-router";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";
import PageHeader from "../components/ui/PageHeader";
import ProductCard from "../components/ui/ProductCard";
import ProductGrid from "../components/ui/ProductGrid";
import Spinner from "../components/ui/Spinner";
import { useNotify } from "../hooks/useNotify";
import { useUpdateUserList, useUserList } from "../hooks/useUserList";
import { ROUTES } from "../utils/routes";

export default function MyWishlistPage() {
  const notify = useNotify();
  const { data: wishlist, isPending, error, refetch } = useUserList("wishlist");
  const updateWishlist = useUpdateUserList("wishlist");

  const handleRemove = (id: string) =>
    updateWishlist.mutate((items) => items.filter((item) => item.id !== id), {
      onSuccess: () => notify.success("Removed from wishlist"),
      onError: notify.error,
    });

  if (isPending) return <Spinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;

  return (
    <>
      <PageHeader title="My wishlist" />
      {wishlist.length === 0 ? (
        <EmptyState title="Yer wishlist is empty">
          <Link to={ROUTES.HOME} className="btn">
            Browse items
          </Link>
        </EmptyState>
      ) : (
        <ProductGrid>
          {wishlist.map((item) => (
            <ProductCard
              key={item.id}
              title={item.title}
              price={item.price}
              image={item.imageurl}
              description={item.description}
              actions={
                <button
                  type="button"
                  className="btn"
                  disabled={updateWishlist.isPending}
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              }
            />
          ))}
        </ProductGrid>
      )}
    </>
  );
}
