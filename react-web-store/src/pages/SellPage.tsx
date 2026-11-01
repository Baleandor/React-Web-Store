import { useNavigate } from "react-router";
import ListingForm from "../components/form/ListingForm";
import PageHeader from "../components/ui/PageHeader";
import { useNotify } from "../hooks/useNotify";
import { useUpdateUserList } from "../hooks/useUserList";
import type { ListingValues } from "../schemas";
import { ROUTES } from "../utils/routes";

export default function SellPage() {
  const navigate = useNavigate();
  const notify = useNotify();
  const updateOffers = useUpdateUserList("offers");

  const handleSubmit = async (values: ListingValues) => {
    try {
      await updateOffers.mutateAsync((offers) => [
        ...offers,
        { id: crypto.randomUUID(), ...values },
      ]);
      notify.success("Yer offer is up for grabs!");
      navigate(ROUTES.MY_OFFERS);
    } catch (error) {
      notify.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Sell an item"
        subtitle="List yer loot for other boyz to buy."
      />
      <ListingForm submitLabel="Create offer" onSubmit={handleSubmit} />
    </div>
  );
}
