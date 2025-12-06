import { IoMdAdd } from 'react-icons/io';
import type { MouseEvent } from 'react';

import { LABELS } from '@constants/label';
import { MODAL_TYPES } from '@constants/modals';
import useBookmarks from '@hooks/useBookmarks';

import Modal from './modals';

const { ADD } = LABELS;

const AddBookmarkButton = () => {
  const { breadcrumbs } = useBookmarks();

  const handleAddBookmark = (e: MouseEvent) => {
    e.preventDefault();

    Modal.open({
      openModalType: MODAL_TYPES.CREATE_BOOKMARK,
      closeOnOutsideClick: true,
      childrenProps: {
        parentId: breadcrumbs[breadcrumbs.length - 1].id,
      },
    });
  };

  return (
    <button
      className="gap-auto relative flex w-full cursor-pointer flex-col items-center justify-start transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-lg"
      onClick={handleAddBookmark}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="mb-3 flex min-h-15 min-w-15 items-center justify-center rounded-lg bg-black/10 transition-transform duration-300 group-hover:scale-110 dark:bg-white/10">
        <IoMdAdd className="h-9 w-9 object-contain text-black opacity-80 transition-opacity group-hover:opacity-100 dark:text-white" />
      </div>
      <span className="text-center text-sm font-medium text-gray-700 transition-colors group-hover:text-black dark:text-gray-300 dark:group-hover:text-white">
        {ADD}
      </span>
    </button>
  );
};

export default AddBookmarkButton;
