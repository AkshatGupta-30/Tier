import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsInfoLg } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { IoAlert } from 'react-icons/io5';
import { MdDone } from 'react-icons/md';

import { ToastType, type IToast } from '@ts/toast';
import { useAppSelector, useAppDispatch } from '@store';
import { toastManager, hideToast, popToast } from '@store/slices/toast';
import { appendToast } from '@utils';

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

const ToastComponent = ({ message, type, isVisible, index, onClose }: IToast & { index: number; onClose: (index: number) => void }) => {
  return (
    <div
      className={`flex w-fit flex-row items-center gap-3 rounded-lg bg-[#222222] p-2.5 ${isVisible ? 'slide-in' : 'slide-out'}`}
    >
      <ToastIcon type={type} />
      <p className="h-full max-w-40 min-w-6 text-white">{message}</p>
      <button 
        className="rounded-full p-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => onClose(index)}
      >
        <IoMdClose className="text-lg text-white" />
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const dispatch = useAppDispatch();
  const {toasts} = useAppSelector(toastManager)

  const handleCloseToast = (index: number) => {
    dispatch(hideToast(index));
    setTimeout(() => dispatch(popToast()), 500); // Wait for animation to complete
  };

  useEffect(() => {
    appendToast("svfvedv frvfrtgvbfrtgvbgtrfvbgtrfgb", ToastType.INFO)
  }, [])

  return createPortal(
    <div className={'pointer-events-none fixed inset-0 z-50 p-4 flex flex-col gap-2'}>
      {toasts.map((t, index) => (
        <ToastComponent {...t} key={index} index={index} onClose={handleCloseToast} />
      ))}
    </div>,
    modalRoot,
  );
};

export default ToastContainer;
