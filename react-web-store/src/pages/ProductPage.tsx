import { Link, useParams } from "react-router";
import AddToCartButton from "../components/ui/AddToCartButton";
import AddToWishlistButton from "../components/ui/AddToWishlistButton";
import ErrorMessage from "../components/ui/ErrorMessage";
import ProductImage from "../components/ui/ProductImage";
import Spinner from "../components/ui/Spinner";
import { useProduct } from "../hooks/useProducts";
import { capitalize, formatPrice } from "../utils/format";
import { paths, ROUTES } from "../utils/routes";

export default function ProductPage() {
  const { productId = "" } = useParams();
  const { data: product, isPending, error, refetch } = useProduct(productId);

  if (isPending) return <Spinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;

  // The Fake Store API answers unknown ids with an empty body.
  if (!product) {
    return <ErrorMessage error={new Error("Dat product don't exist!")} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Breadcrumb" className="text-sm text-lime-200/70">
        <Link to={ROUTES.HOME} className="link">
          Home
        </Link>
        {" / "}
        <Link to={paths.category(product.category)} className="link">
          {capitalize(product.category)}
        </Link>
      </nav>

      <article className="grid gap-8 card p-6 md:grid-cols-2">
        <ProductImage
          src={product.image}
          alt={product.title}
          className="aspect-square"
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-lime-50">{product.title}</h1>
          <p className="text-3xl font-semibold text-lime-300">
            {formatPrice(product.price)}
          </p>
          <p className="leading-relaxed text-lime-200/80">
            {product.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-2">
            <AddToCartButton product={product} />
            <AddToWishlistButton
              item={{
                title: product.title,
                price: product.price,
                description: product.description,
                imageurl: product.image,
              }}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
