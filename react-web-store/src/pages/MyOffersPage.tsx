import { Link } from "react-router";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";
import PageHeader from "../components/ui/PageHeader";
import ProductCard from "../components/ui/ProductCard";
import ProductGrid from "../components/ui/ProductGrid";
import Spinner from "../components/ui/Spinner";
import { useNotify } from "../hooks/useNotify";
import { useUpdateUserList, useUserList } from "../hooks/useUserList";
import { paths, ROUTES } from "../utils/routes";

export default function MyOffersPage() {
  const notify = useNotify();
  const { data: offers, isPending, error, refetch } = useUserList("offers");
  const updateOffers = useUpdateUserList("offers");

  const handleDelete = (id: string) =>
    updateOffers.mutate((items) => items.filter((item) => item.id !== id), {
      onSuccess: () => notify.success("Offer deleted"),
      onError: notify.error,
    });

  if (isPending) return <Spinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;

  return (
    <>
      <PageHeader
        title="My offers"
        actions={
          offers.length > 0 && (
            <Link to={ROUTES.SELL} className="btn btn-solid">
              New offer
            </Link>
          )
        }
      />
      {offers.length === 0 ? (
        <EmptyState title="No offers yet">
          <Link to={ROUTES.SELL} className="btn btn-solid">
            Create your first offer
          </Link>
        </EmptyState>
      ) : (
        <ProductGrid>
          {offers.map((offer) => (
            <ProductCard
              key={offer.id}
              title={offer.title}
              price={offer.price}
              image={offer.imageurl}
              description={offer.description}
              actions={
                <>
                  <Link to={paths.editOffer(offer.id)} className="btn">
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn"
                    disabled={updateOffers.isPending}
                    onClick={() => handleDelete(offer.id)}
                  >
                    Delete
                  </button>
                </>
              }
            />
          ))}
        </ProductGrid>
      )}
    </>
  );
}
