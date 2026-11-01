import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
  id: string;
  email: string | undefined;
  displayName: string;
};

type AuthState = {
  user: AuthUser | null;
  /** "loading" until Supabase reports the initial session. */
  status: "loading" | "ready";
};

const initialState: AuthState = {
  user: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionChanged: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.status = "ready";
    },
  },
});

export const { sessionChanged } = authSlice.actions;

export default authSlice.reducer;
