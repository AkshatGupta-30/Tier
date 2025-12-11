import { Activity, useEffect, useRef, useState, type SetStateAction, type Dispatch } from 'react';
import { createPortal } from 'react-dom';

import NewTab from '@pages/NewTab';
import useTheme from '@hooks/useTheme';
import { IoMdClose } from 'react-icons/io';

const modalRoot = document.querySelector('#modal-root') as Element;

interface NewTabPreviewProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  isOpen?: boolean;
}

const NewTabPreview = ({ isOpen, setVisible }: NewTabPreviewProps) => {
  const { backgroundColor } = useTheme();

  return createPortal(
    <Activity mode={isOpen ? 'visible' : 'hidden'}>
      <div className={`fixed inset-0 z-50`}>
        <button className="fixed inset-0 z-0 bg-black/80" />
        <div
          className={`relative z-1 flex h-full w-full scale-90 items-center justify-center rounded-2xl ${backgroundColor.classes}`}
        >
          <div
            className="h-full w-full px-10"
            inert
          >
            <NewTab />
          </div>
          <button
            className="absolute top-0 right-0 z-1000 m-3 cursor-pointer rounded-full bg-black/40 p-2 transition-colors duration-300 hover:bg-black/80 dark:bg-white/40 dark:hover:bg-white/80"
            onClick={() => setVisible(false)}
          >
            <IoMdClose className="text-4xl text-white dark:text-black" />
          </button>
        </div>
      </div>
    </Activity>,
    modalRoot,
  );
};

export default NewTabPreview;
