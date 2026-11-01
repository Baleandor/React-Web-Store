import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./index";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartQuantity = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
);

export const selectItemQuantity = (state: RootState, id: number) =>
  state.cart.items.find((item) => item.id === id)?.quantity ?? 0;
