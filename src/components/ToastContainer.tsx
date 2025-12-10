import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsInfoLg } from 'react-icons/bs';
import { IoAlert } from 'react-icons/io5';
import { MdDone } from 'react-icons/md';

import { ToastType, type IToast } from '@ts/toast';
import { useAppSelector } from '@store';
import { toastManager } from '@store/slices/toast';

const modalRoot = document.querySelector('#modal-root') as Element;

const ToastIcon = ({ type }: { type: ToastType }) => {
  const color = useMemo(() => {
    switch (type) {
      case ToastType.INFO:
        return '#006cda';
      case ToastType.ERROR:
        return '#eb4c26';
      case ToastType.SUCCESS:
        return '#32dd5e';
      default:
        return '#f39501';
    }
  }, [type]);

  const Icon = useMemo(() => {
    switch (type) {
      case ToastType.INFO:
        return BsInfoLg;
      case ToastType.ERROR:
        return AiFillCloseCircle;
      case ToastType.SUCCESS:
        return MdDone;
      default:
        return IoAlert;
    }
  }, [type]);

  return (
    <div
      className="rounded-full p-2"
      style={{
        backgroundColor: `rgb(from ${color} r g b / 0.3)`,
        boxShadow: `0 2px 5px 5px rgb(from ${color} r g b / 0.1)`,
      }}
    >
      <div
        className="flex h-5 w-5 items-center justify-center rounded-full"
        style={{ backgroundColor: color }}
      >
        <Icon />
      </div>
    </div>
  );
};

const ToastComponent = ({ message, type, isVisible }: IToast) => {
  return (
    <div
      className={`flex w-fit flex-row items-center gap-3 rounded-lg bg-[#333333] p-2.5 dark:bg-[#cccccc] ${isVisible ? 'slide-in' : 'slide-out'}`}
    >
      <ToastIcon type={type} />
      <p className="h-full max-w-40 min-w-6 text-white dark:text-black">{message}</p>
    </div>
  );
};

const ToastContainer = () => {
  const { toasts } = useAppSelector(toastManager);

  return createPortal(
    <div className={'pointer-events-none fixed inset-0 z-100 flex flex-col items-end gap-2 p-4'}>
      {toasts.map((t, index) => (
        <ToastComponent
          {...t}
          key={index}
        />
      ))}
    </div>,
    modalRoot,
  );
};

export default ToastContainer;
