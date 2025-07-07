import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Offer {
  id: string
  title: string
  price: number
  description: string
  imageurl: string
}

interface OffersState {
  items: Offer[]
  isLoading: boolean
  error: string | null
}

const initialState: OffersState = {
  items: [],
  isLoading: false,
  error: null
}

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffersLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.items = action.payload
      state.error = null
    },
    addOffer: (state, action: PayloadAction<Offer>) => {
      state.items.push(action.payload)
    },
    updateOffer: (state, action: PayloadAction<Offer>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    removeOffer: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    setOffersError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearOffersError: (state) => {
      state.error = null
    }
  }
})

export const {
  setOffersLoading,
  setOffers,
  addOffer,
  updateOffer,
  removeOffer,
  setOffersError,
  clearOffersError
} = offersSlice.actions

export default offersSlice.reducer 