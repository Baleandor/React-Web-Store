import { useParams } from "react-router";
import ErrorMessage from "../components/ui/ErrorMessage";
import PageHeader from "../components/ui/PageHeader";
import ProductList from "../components/ui/ProductList";
import Spinner from "../components/ui/Spinner";
import { useCategoryProducts } from "../hooks/useProducts";
import { capitalize } from "../utils/format";

export default function CategoryPage() {
  const { categoryName = "" } = useParams();
  const {
    data: products,
    isPending,
    error,
    refetch,
  } = useCategoryProducts(categoryName);

  return (
    <>
      <PageHeader
        title={capitalize(categoryName)}
        subtitle={products && `${products.length} products`}
      />
      {isPending ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage error={error} onRetry={refetch} />
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
}
