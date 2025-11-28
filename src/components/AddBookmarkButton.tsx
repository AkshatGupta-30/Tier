import { IoMdAdd } from 'react-icons/io';
import type { MouseEvent } from 'react';

import { LABELS } from '@constants/label';
import { MODAL_TYPES } from '@constants/modals';
import useBookmarks from '@hooks/useBookmarks';

import Modal from './modals';

const { ADD } = LABELS;

const AddBookmarkButton = () => {
  const { breadcrumbs, bookmarkSearches } = useBookmarks();

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

  if (bookmarkSearches) return null;

  return (
    <button
      className="relative w-full flex flex-col items-center justify-center gap-auto transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-lg cursor-pointer"
      onClick={handleAddBookmark}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="min-w-15 min-h-15 mb-3 rounded-lg bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <IoMdAdd className="w-9 h-9 object-contain opacity-80 group-hover:opacity-100 transition-opacity text-white" />
      </div>
      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors text-center">
        {ADD}
      </span>
    </button>
  );
};

export default AddBookmarkButton;
