import { Activity } from 'react';
import { createPortal } from 'react-dom';

import { useAppSelector } from '@store';
import { modalManager } from '@store/slices/modals';

const modalRoot = document.querySelector('#modal-root') as Element;

const Modal = () => {
  const { isOpen, component } = useAppSelector(modalManager);

  return createPortal(
    <Activity mode={isOpen ? 'visible' : 'hidden'}>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-20">
        {component}
      </div>
    </Activity>,
    modalRoot,
  );
};

export default Modal;
