import { describe, expect, it } from "vitest";
import { createTestStore } from "../test/render";
import {
  selectCartItems,
  selectCartQuantity,
  selectCartTotal,
  selectItemQuantity,
} from "./cartSelectors";
import cartReducer, {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "./cartSlice";

const backpack = { id: 1, title: "Backpack", price: 10, image: "a.png" };
const bracelet = { id: 3, title: "Bracelet", price: 2.5, image: "b.png" };
const shirt = { id: 2, title: "Shirt", price: 4, image: "c.png" };

const reduce = (...actions: Parameters<typeof cartReducer>[1][]) =>
  actions.reduce(cartReducer, cartReducer(undefined, { type: "@@INIT" }));

describe("cartSlice", () => {
  it("adds a new product with quantity 1", () => {
    expect(reduce(addToCart(backpack)).items).toEqual([
      { ...backpack, quantity: 1 },
    ]);
  });

  it("increments the quantity when the same product is added again", () => {
    const state = reduce(addToCart(backpack), addToCart(backpack));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("keeps items in the order they were added, not by id", () => {
    const state = reduce(
      addToCart(bracelet),
      addToCart(backpack),
      addToCart(shirt),
    );
    expect(state.items.map((item) => item.id)).toEqual([3, 1, 2]);
  });

  it("increases and decreases quantity", () => {
    const state = reduce(
      addToCart(backpack),
      increaseQuantity(1),
      increaseQuantity(1),
      decreaseQuantity(1),
    );
    expect(state.items[0].quantity).toBe(2);
  });

  it("removes the item when its quantity drops to zero", () => {
    const state = reduce(
      addToCart(backpack),
      addToCart(shirt),
      decreaseQuantity(1),
    );
    expect(state.items.map((item) => item.id)).toEqual([2]);
  });

  it("ignores quantity changes for products not in the cart", () => {
    const state = reduce(
      addToCart(backpack),
      increaseQuantity(99),
      decreaseQuantity(99),
    );
    expect(state.items).toEqual([{ ...backpack, quantity: 1 }]);
  });

  it("removes a product regardless of quantity", () => {
    const state = reduce(
      addToCart(backpack),
      addToCart(backpack),
      addToCart(shirt),
      removeFromCart(1),
    );
    expect(state.items.map((item) => item.id)).toEqual([2]);
  });

  it("clears the cart", () => {
    expect(reduce(addToCart(backpack), clearCart()).items).toEqual([]);
  });
});

describe("cart selectors", () => {
  it("derives item list, total quantity, total price and per-item quantity", () => {
    const store = createTestStore();
    store.dispatch(addToCart(backpack));
    store.dispatch(addToCart(backpack));
    store.dispatch(addToCart(bracelet));
    const state = store.getState();

    expect(selectCartItems(state)).toHaveLength(2);
    expect(selectCartQuantity(state)).toBe(3);
    expect(selectCartTotal(state)).toBe(22.5);
    expect(selectItemQuantity(state, 1)).toBe(2);
    expect(selectItemQuantity(state, 404)).toBe(0);
  });
});
