import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../test/render";
import SearchPage from "./SearchPage";

vi.mock("../utils/api", async () => {
  const { PRODUCTS } = await import("../test/fixtures");
  return { getAllProducts: vi.fn(async () => PRODUCTS) };
});

// The wishlist button imports the Supabase client, which needs env vars to load.
vi.mock("../supabase/client", () => ({ supabaseClient: {} }));

describe("SearchPage", () => {
  it("asks for a search term instead of listing everything when the query is empty", () => {
    renderWithProviders(<SearchPage />, { route: "/search?q=%20%20" });

    expect(screen.getByText(/wot are ya lookin' for/i)).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("lists products whose title or category matches", async () => {
    renderWithProviders(<SearchPage />, { route: "/search?q=jewel" });

    expect(
      await screen.findByRole("heading", { name: 'Results for "jewel"' }),
    ).toBeInTheDocument();
    expect(screen.getByText("1 product found")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Gold Dragon Bracelet" }),
    ).toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    renderWithProviders(<SearchPage />, { route: "/search?q=choppa" });

    expect(await screen.findByText("No loot found")).toBeInTheDocument();
  });
});
