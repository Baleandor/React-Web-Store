import type { Product } from "../../types";
import { paths } from "../../utils/routes";
import AddToCartButton from "./AddToCartButton";
import AddToWishlistButton from "./AddToWishlistButton";
import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";

/** Grid of Fake Store products with wishlist and cart actions. */
export default function ProductList({ products }: { products: Product[] }) {
  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          to={paths.product(product.id)}
          actions={
            <>
              <AddToCartButton product={product} />
              <AddToWishlistButton
                item={{
                  title: product.title,
                  price: product.price,
                  description: product.description,
                  imageurl: product.image,
                }}
              />
            </>
          }
        />
      ))}
    </ProductGrid>
  );
}
