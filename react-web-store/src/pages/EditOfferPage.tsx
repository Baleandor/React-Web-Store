import { Link, useNavigate, useParams } from "react-router";
import ListingForm from "../components/form/ListingForm";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";
import PageHeader from "../components/ui/PageHeader";
import Spinner from "../components/ui/Spinner";
import { useNotify } from "../hooks/useNotify";
import { useUpdateUserList, useUserList } from "../hooks/useUserList";
import type { ListingValues } from "../schemas";
import { ROUTES } from "../utils/routes";

export default function EditOfferPage() {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const notify = useNotify();
  const { data: offers, isPending, error } = useUserList("offers");
  const updateOffers = useUpdateUserList("offers");

  if (isPending) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  const offer = offers.find((item) => item.id === offerId);

  if (!offer) {
    return (
      <EmptyState title="Offer not found">
        <Link to={ROUTES.MY_OFFERS} className="btn">
          Back to my offers
        </Link>
      </EmptyState>
    );
  }

  const handleSubmit = async (values: ListingValues) => {
    try {
      await updateOffers.mutateAsync((items) =>
        items.map((item) =>
          item.id === offer.id ? { ...item, ...values } : item,
        ),
      );
      notify.success("Offer updated");
      navigate(ROUTES.MY_OFFERS);
    } catch (submitError) {
      notify.error(submitError);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Edit offer" subtitle={offer.title} />
      <ListingForm
        defaultValues={offer}
        submitLabel="Save changes"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
