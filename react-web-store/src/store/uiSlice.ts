import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export type ToastType = "success" | "error";

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type UIState = {
  toasts: Toast[];
};

const initialState: UIState = {
  toasts: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showToast: {
      reducer: (state, action: PayloadAction<Toast>) => {
        state.toasts.push(action.payload);
      },
      prepare: (message: string, type: ToastType) => ({
        payload: { id: nanoid(), message, type },
      }),
    },
    dismissToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
  },
});

export const { showToast, dismissToast } = uiSlice.actions;

export default uiSlice.reducer;
