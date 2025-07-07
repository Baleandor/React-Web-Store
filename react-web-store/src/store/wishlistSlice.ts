import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WishlistItem {
  id: string
  title: string
  price: number
  description: string
  imageurl: string
}

interface WishlistState {
  items: WishlistItem[]
  isLoading: boolean
  error: string | null
}

const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlistLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setWishlistItems: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload
      state.error = null
    },
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (!existingItem) {
        state.items.push(action.payload)
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    setWishlistError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearWishlistError: (state) => {
      state.error = null
    }
  }
})

export const {
  setWishlistLoading,
  setWishlistItems,
  addToWishlist,
  removeFromWishlist,
  setWishlistError,
  clearWishlistError
} = wishlistSlice.actions

export default wishlistSlice.reducer 