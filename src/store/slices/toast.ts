import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IToast } from '@ts/toast';

interface ToastState {
  toasts: IToast[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, { payload }: PayloadAction<IToast>) => {
      state.toasts = [payload, ...state.toasts];
    },
    hideToast: (state, { payload }: PayloadAction<number>) => {
      const toast = state.toasts[payload];
      if (toast) {
        toast.isVisible = false;
      }
    },
    popToast: (state) => {
      state.toasts.pop();
    },
  },
});

export const { showToast, hideToast, popToast } = toastSlice.actions;

export const toastManager = (state: { toast: ToastState }) => state.toast;

export default toastSlice.reducer;
