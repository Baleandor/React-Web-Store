import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types";

export type CartItem = Pick<Product, "id" | "title" | "price" | "image"> & {
  quantity: number;
};

type CartState = {
  items: Record<number, CartItem>;
};

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const product = action.payload;
      const existing = state.items[product.id];
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items[product.id] = { ...product, quantity: 1 };
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items[action.payload];
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items[action.payload];
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) delete state.items[action.payload];
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      delete state.items[action.payload];
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
