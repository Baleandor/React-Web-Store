import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PRODUCTS } from "../../test/fixtures";
import { renderWithProviders } from "../../test/render";
import SearchBar from "./SearchBar";

vi.mock("../../utils/api", async () => {
  const { PRODUCTS } = await import("../../test/fixtures");
  return {
    getAllProducts: vi.fn(async () => PRODUCTS),
    getCategories: vi.fn(async () => ["men's clothing", "jewelery"]),
  };
});

function setup() {
  const user = userEvent.setup();
  renderWithProviders(<SearchBar />);
  const input = screen.getByRole("combobox", { name: /search products/i });
  return { user, input };
}

const location = () => screen.getByTestId("location");

describe("SearchBar", () => {
  it("suggests products matching the title or the category", async () => {
    const { user, input } = setup();

    await user.type(input, "jewel");

    const options = await screen.findAllByRole("option");
    expect(options.map((option) => option.textContent)).toEqual([
      "Gold Dragon Bracelet",
    ]);
    expect(input).toHaveAttribute("aria-expanded", "true");
  });

  it("tells the user when nothing matches", async () => {
    const { user, input } = setup();

    await user.type(input, "zzz");

    expect(await screen.findByText(/no results found/i)).toBeInTheDocument();
  });

  it("opens the highlighted suggestion with the arrow keys and Enter", async () => {
    const { user, input } = setup();

    await user.type(input, "men");
    await screen.findAllByRole("option");
    await user.keyboard("{ArrowDown}{ArrowDown}");

    const second = screen.getByRole("option", { name: PRODUCTS[1].title });
    expect(second).toHaveAttribute("aria-selected", "true");
    expect(input).toHaveAttribute("aria-activedescendant", second.id);

    await user.keyboard("{Enter}");
    expect(location()).toHaveTextContent(`/products/${PRODUCTS[1].id}`);
  });

  it("wraps the highlight from the top back to the last suggestion", async () => {
    const { user, input } = setup();

    await user.type(input, "men");
    await screen.findAllByRole("option");
    await user.keyboard("{ArrowUp}");

    expect(
      screen.getByRole("option", { name: PRODUCTS[1].title }),
    ).toHaveAttribute("aria-selected", "true");
  });

  it("goes to the results page on Enter when nothing is highlighted", async () => {
    const { user, input } = setup();

    await user.type(input, "  back pack {Enter}");

    expect(location()).toHaveTextContent("/search?q=back%20pack");
  });

  it("closes the suggestions on Escape", async () => {
    const { user, input } = setup();

    await user.type(input, "men");
    await screen.findAllByRole("option");
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it("opens a suggestion when clicked", async () => {
    const { user, input } = setup();

    await user.type(input, "bracelet");
    await user.click(
      await screen.findByRole("option", { name: PRODUCTS[2].title }),
    );

    expect(location()).toHaveTextContent(`/products/${PRODUCTS[2].id}`);
  });
});
