import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  component: React.ReactNode;
}

const initialState: ModalState = {
  isOpen: false,
  component: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }: PayloadAction<React.ReactNode>) => {
      state.isOpen = true;
      state.component = payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.component = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalManager = (state: { modal: ModalState }) => state.modal;

export default modalSlice.reducer;
