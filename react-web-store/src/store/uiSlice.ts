import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  isGlobalLoading: boolean
  globalError: string | null
  notification: {
    message: string | null
    type: 'success' | 'error' | 'info' | null
  }
}

const initialState: UIState = {
  isGlobalLoading: false,
  globalError: null,
  notification: {
    message: null,
    type: null
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.isGlobalLoading = action.payload
    },
    setGlobalError: (state, action: PayloadAction<string | null>) => {
      state.globalError = action.payload
    },
    clearGlobalError: (state) => {
      state.globalError = null
    },
    setNotification: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) => {
      state.notification = action.payload
    },
    clearNotification: (state) => {
      state.notification = {
        message: null,
        type: null
      }
    }
  }
})

export const {
  setGlobalLoading,
  setGlobalError,
  clearGlobalError,
  setNotification,
  clearNotification
} = uiSlice.actions

export default uiSlice.reducer 