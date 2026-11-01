import { describe, expect, it } from "vitest";
import { capitalize, formatPrice } from "./format";
import { getRedirectPath, paths, ROUTES } from "./routes";
import { matchesQuery } from "./search";

describe("getRedirectPath", () => {
  it("keeps the query string and hash of the page the user came from", () => {
    const state = {
      from: { pathname: "/search", search: "?q=bag", hash: "#top" },
    };
    expect(getRedirectPath(state)).toBe("/search?q=bag#top");
  });

  it("works when only a pathname is present", () => {
    expect(getRedirectPath({ from: { pathname: "/sell" } })).toBe("/sell");
  });

  it.each([null, undefined, {}, { from: {} }])(
    "falls back to home for %j",
    (state) => {
      expect(getRedirectPath(state)).toBe(ROUTES.HOME);
    },
  );
});

describe("paths", () => {
  it("encodes category names and search queries", () => {
    expect(paths.category("men's clothing")).toBe(
      "/categories/men's%20clothing",
    );
    expect(paths.search("a&b")).toBe("/search?q=a%26b");
  });
});

describe("matchesQuery", () => {
  const product = { title: "Fjallraven Backpack", category: "men's clothing" };

  it("matches the title case-insensitively", () => {
    expect(matchesQuery(product, "BACKPACK")).toBe(true);
  });

  it("matches the category", () => {
    expect(matchesQuery(product, "clothing")).toBe(true);
  });

  it("ignores surrounding whitespace", () => {
    expect(matchesQuery(product, "  pack ")).toBe(true);
  });

  it("does not match unrelated or empty queries", () => {
    expect(matchesQuery(product, "bracelet")).toBe(false);
    expect(matchesQuery(product, "   ")).toBe(false);
  });
});

describe("format", () => {
  it("formats prices as USD", () => {
    expect(formatPrice(1499.99)).toBe("$1,499.99");
  });

  it("capitalizes the first letter", () => {
    expect(capitalize("jewelery")).toBe("Jewelery");
  });
});
