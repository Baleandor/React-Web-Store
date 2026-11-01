import { useMemo } from "react";
import { useSearchParams } from "react-router";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";
import PageHeader from "../components/ui/PageHeader";
import ProductList from "../components/ui/ProductList";
import Spinner from "../components/ui/Spinner";
import { useAllProducts } from "../hooks/useProducts";
import { matchesQuery } from "../utils/search";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const { data: products, isPending, error, refetch } = useAllProducts();

  const results = useMemo(
    () => (products ?? []).filter((product) => matchesQuery(product, query)),
    [products, query],
  );

  if (!query) {
    return (
      <EmptyState title="Wot are ya lookin' for?">
        <p className="text-lime-200/70">
          Type somefing in da search bar to find some loot.
        </p>
      </EmptyState>
    );
  }

  if (isPending) return <Spinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;

  return (
    <>
      <PageHeader
        title={`Results for "${query}"`}
        subtitle={`${results.length} product${results.length === 1 ? "" : "s"} found`}
      />
      {results.length > 0 ? (
        <ProductList products={results} />
      ) : (
        <EmptyState title="No loot found">
          <p className="text-lime-200/70">Try a different word, ya grot.</p>
        </EmptyState>
      )}
    </>
  );
}
