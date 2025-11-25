import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { ModalType } from '@constants/modals';
import type { ModalPropsMap } from '@ts/modal';

export interface ModalPropsType<T = unknown> {
  openModalType: ModalType;
  closeOnOutsideClick?: boolean;
  childrenProps: T;
  className?: {
    modal?: string;
    overlay?: string;
  };
}

interface ModalState<K extends ModalType = ModalType> {
  isOpen: boolean;
  modalProps?: ModalPropsType<ModalPropsMap[K]>;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }: PayloadAction<ModalPropsType<any>>) => {
      state.isOpen = true;
      state.modalProps = payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalProps = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalManager = (state: { modal: ModalState }) => state.modal;

export default modalSlice.reducer;
