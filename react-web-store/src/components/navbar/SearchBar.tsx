import {
  useId,
  useMemo,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useNavigate } from "react-router";
import { useAllProducts } from "../../hooks/useProducts";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { paths } from "../../utils/routes";
import { matchesQuery } from "../../utils/search";
import CategoriesMenu from "./CategoriesMenu";

const MAX_SUGGESTIONS = 6;

export default function SearchBar() {
  const navigate = useNavigate();
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedQuery = useDebouncedValue(query.trim().toLowerCase(), 200);

  const { data: products } = useAllProducts();

  const suggestions = useMemo(() => {
    if (!debouncedQuery || !products) return [];
    return products
      .filter((product) => matchesQuery(product, debouncedQuery))
      .slice(0, MAX_SUGGESTIONS);
  }, [products, debouncedQuery]);

  const showSuggestions = isOpen && debouncedQuery.length > 0;

  const goTo = (path: string) => {
    setIsOpen(false);
    setActiveIndex(-1);
    navigate(path);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const activeSuggestion = suggestions[activeIndex];
    if (activeSuggestion) goTo(paths.product(activeSuggestion.id));
    else if (query.trim()) goTo(paths.search(query.trim()));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => {
        const next = index + step;
        if (next < -1) return suggestions.length - 1;
        if (next >= suggestions.length) return -1;
        return next;
      });
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative flex h-10 w-full rounded-md border-2 border-transparent focus-within:border-lime-300">
      <CategoriesMenu />

      <form role="search" onSubmit={handleSubmit} className="flex flex-1">
        <input
          type="search"
          role="combobox"
          aria-label="Search products"
          aria-expanded={showSuggestions}
          aria-controls={listboxId}
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined
          }
          autoComplete="off"
          placeholder="Search da loot..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 bg-lime-500 px-3 text-zinc-950 placeholder:text-zinc-800/70 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex w-11 items-center justify-center rounded-r-md bg-lime-800 hover:bg-lime-700"
        >
          <img src="/images/search-icon.png" alt="" className="size-5" />
        </button>
      </form>

      {showSuggestions && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute top-full right-0 left-0 z-50 mt-1 overflow-hidden rounded-md border border-lime-700 bg-zinc-800 py-1 shadow-xl"
        >
          {suggestions.length === 0 ? (
            <li className="px-3 py-2 text-sm text-lime-200">
              No results found :(
            </li>
          ) : (
            suggestions.map((product, index) => (
              <li
                key={product.id}
                id={`${listboxId}-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                // mousedown fires before the input blurs and closes the list
                onMouseDown={(event) => {
                  event.preventDefault();
                  goTo(paths.product(product.id));
                }}
                className={`cursor-pointer truncate px-3 py-2 text-sm text-cyan-200 hover:bg-lime-900/60 ${
                  index === activeIndex ? "bg-lime-900/60" : ""
                }`}
              >
                {product.title}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
