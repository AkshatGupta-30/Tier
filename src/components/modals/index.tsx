import { Activity } from 'react';
import { createPortal } from 'react-dom';

import { MODAL_COMPONENTS, type ModalType } from '@constants/modals';
import store, { useAppSelector } from '@store';
import { closeModal, modalManager, openModal, type ModalPropsType } from '@store/slices/modals';
import type { ModalPropsMap } from '@ts/modal';

const modalRoot = document.querySelector('#modal-root') as Element;

const Modal = () => {
  const { isOpen, modalProps } = useAppSelector(modalManager);
  const { openModalType, childrenProps, className } = modalProps || {};

  const Component = openModalType ? MODAL_COMPONENTS[openModalType] : null;

  return createPortal(
    <Activity mode={isOpen ? 'visible' : 'hidden'}>
      <div className={`fixed inset-0 z-50 ${className?.modal}`}>
        <button className="fixed inset-0 bg-black/50 z-0" />
        <div className="relative z-1 w-full h-full flex items-center justify-center p-20">
          {Component ? <Component {...childrenProps!} /> : null}
        </div>
      </div>
    </Activity>,
    modalRoot,
  );
};

Modal.open = <T extends ModalType>(payload: ModalPropsType<ModalPropsMap[T]>) => {
  return store.dispatch(openModal(payload));
};

Modal.close = () => {
  store.dispatch(closeModal());
};

export default Modal;
