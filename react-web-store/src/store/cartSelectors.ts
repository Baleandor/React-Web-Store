import { createSelector } from '@reduxjs/toolkit'
import { CartItem } from './cartSlice'
import { RootState } from './index'

export const selectCartItems = (state: RootState) => state.cart.items

export const selectCartItemsArray = createSelector(
  [selectCartItems],
  (items): CartItem[] => Object.values(items)
)

export const selectCartQuantity = createSelector(
  [selectCartItemsArray],
  (items: CartItem[]) => items.reduce((quantity: number, item: CartItem) => item.quantity + quantity, 0)
)

export const selectTotalCartPrice = createSelector(
  [selectCartItemsArray],
  (items: CartItem[]) => items.reduce((totalPrice: number, item: CartItem) => totalPrice + item.price * item.quantity, 0).toFixed(2)
)

export const selectItemQuantity = (id: number) => createSelector(
  [selectCartItems],
  (items: { [key: number]: CartItem }) => items[id]?.quantity || 0
) 