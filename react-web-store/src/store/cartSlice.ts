import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id: number
  quantity: number
  price: number
}

interface CartState {
  items: { [key: number]: CartItem }
}

const initialState: CartState = {
  items: {}
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseItemQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload
      if (!state.items[id]) {
        state.items[id] = { id, quantity: 1, price: 0 }
      } else {
        state.items[id].quantity += 1
      }
    },
    decreaseItemQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const existingItem = state.items[id]
      if (existingItem) {
        existingItem.quantity -= 1
        if (existingItem.quantity === 0) {
          delete state.items[id]
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload
      delete state.items[id]
    },
    setItemPrice: (state, action: PayloadAction<{ id: number; price: number }>) => {
      const { id, price } = action.payload
      const existingItem = state.items[id]
      if (existingItem) {
        existingItem.price = price
      }
    },
    clearCart: (state) => {
      state.items = {}
    }
  }
})

export const {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeFromCart,
  setItemPrice,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer 