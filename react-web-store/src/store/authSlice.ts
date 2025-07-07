import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  email: string
  user_metadata?: {
    offers?: any[]
    wishlist?: any[]
  }
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
      state.error = null
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearAuthError: (state) => {
      state.error = null
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      state.isLoading = false
    },
    updateUserMetadata: (state, action: PayloadAction<{ offers?: any[]; wishlist?: any[] }>) => {
      if (state.user) {
        state.user.user_metadata = {
          ...state.user.user_metadata,
          ...action.payload
        }
      }
    }
  }
})

export const {
  setAuthLoading,
  setUser,
  setAuthError,
  clearAuthError,
  logout,
  updateUserMetadata
} = authSlice.actions

export default authSlice.reducer 