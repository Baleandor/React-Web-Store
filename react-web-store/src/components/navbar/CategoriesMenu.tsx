import { useCallback, useId, useRef, useState } from "react";
import { Link } from "react-router";
import { useCategories } from "../../hooks/useProducts";
import { useClickOutside } from "../../hooks/useClickOutside";
import { capitalize } from "../../utils/format";
import { paths } from "../../utils/routes";

export default function CategoriesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(containerRef, close, isOpen);

  const { data: categories, isPending, isError } = useCategories();

  return (
    <div ref={containerRef} className="relative h-full">
      <button
        type="button"
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-full items-center gap-1 rounded-l-md bg-lime-800 px-3 text-sm text-cyan-200 hover:text-cyan-100"
      >
        Categories <span aria-hidden>▾</span>
      </button>

      {isOpen && (
        <div
          id={panelId}
          className="absolute top-full left-0 z-50 mt-1 w-52 overflow-hidden rounded-md border border-lime-700 bg-zinc-800 py-1 shadow-xl"
        >
          {isPending && (
            <p className="px-3 py-2 text-sm text-lime-200">Loading...</p>
          )}
          {isError && (
            <p className="px-3 py-2 text-sm text-red-300">
              Could not load categories
            </p>
          )}
          {categories?.map((category) => (
            <Link
              key={category}
              to={paths.category(category)}
              onClick={close}
              className="block px-3 py-2 text-sm text-cyan-200 hover:bg-lime-900/60 hover:text-cyan-100"
            >
              {capitalize(category)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
