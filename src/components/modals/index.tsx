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
        <button className="fixed inset-0 z-0 bg-black/80" />
        <div className="relative z-1 flex h-full w-full items-center justify-center p-10">
          {Component && <Component {...childrenProps!} />}
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
