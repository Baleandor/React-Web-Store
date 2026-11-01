import type { ReactNode } from "react";
import { Link } from "react-router";
import { formatPrice } from "../../utils/format";
import ProductImage from "./ProductImage";

type ProductCardProps = {
  title: string;
  price: number;
  image: string;
  description?: string;
  /** When set, the image and title link to this path. */
  to?: string;
  actions?: ReactNode;
};

export default function ProductCard({
  title,
  price,
  image,
  description,
  to,
  actions,
}: ProductCardProps) {
  const imageElement = (
    <ProductImage src={image} alt={title} className="aspect-square" />
  );

  return (
    <article className="flex flex-col gap-3 card p-3 transition-colors hover:border-lime-700">
      {to ? (
        <Link to={to} tabIndex={-1} aria-hidden>
          {imageElement}
        </Link>
      ) : (
        imageElement
      )}

      <div className="flex flex-1 flex-col gap-1 px-1">
        <h2 className="line-clamp-2 font-medium text-lime-50" title={title}>
          {to ? (
            <Link to={to} className="hover:underline">
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="text-lg font-semibold text-lime-300">
          {formatPrice(price)}
        </p>
        {description && (
          <p className="line-clamp-3 text-sm text-lime-200/70">{description}</p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap gap-2 px-1 pb-1">{actions}</div>
      )}
    </article>
  );
}
