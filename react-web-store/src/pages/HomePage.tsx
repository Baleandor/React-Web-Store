import { Link } from "react-router";
import AddToWishlistButton from "../components/ui/AddToWishlistButton";
import ProductCard from "../components/ui/ProductCard";
import ProductGrid from "../components/ui/ProductGrid";
import { useCategories } from "../hooks/useProducts";
import { capitalize } from "../utils/format";
import { paths } from "../utils/routes";

const DOKS_STOCK = [
  {
    title: "Uge Choppa",
    price: 749.99,
    imageurl: "/images/huge-choppa.jpg",
    description:
      "Good for slashin'! Good for choppin'! It's big! Great for krumpin'!",
  },
  {
    title: "Powah Klaw",
    price: 1499.99,
    imageurl: "/images/power-klaw.png",
    description: "It's UGE! Great for krumpin'! Really great for krumpin'!",
  },
  {
    title: "Supa Shootah",
    price: 349.99,
    imageurl: "/images/dakka.jpg",
    description: "Goes DAKKADAKKADAKKADAKKA! Great for krumpin'!",
  },
  {
    title: "Kustom Shootah",
    price: 549.99,
    imageurl: "/images/kustom-dakka.jpg",
    description: "Goes DAKKA DAKKA DAKKA DAKKA! Kustomized by da Dok himself.",
  },
];

export default function HomePage() {
  const { data: categories } = useCategories();

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col items-center gap-4 card px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-lime-100 sm:text-5xl">
          Da Dok's Speshul Show-off Collekshun!
        </h1>
        <p className="max-w-2xl text-lg text-lime-200/80">
          Hand-krafted gear from Dok Scrap Krumpa's workshop, plus all da loot a
          boy could want. Browse by category or search for somefing shiny.
        </p>
        {categories && (
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                to={paths.category(category)}
                className="btn"
              >
                {capitalize(category)}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-lime-100">
          Da Dok's Stock
        </h2>
        <ProductGrid>
          {DOKS_STOCK.map((item) => (
            <ProductCard
              key={item.title}
              title={item.title}
              price={item.price}
              image={item.imageurl}
              description={item.description}
              actions={<AddToWishlistButton item={item} />}
            />
          ))}
        </ProductGrid>
      </section>
    </div>
  );
}
