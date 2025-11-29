import { FaFolder } from 'react-icons/fa';

import useBookmarks from '@hooks/useBookmarks';
import useBookmarkContextMenu from '@hooks/useBookmarkContextMenu';
import type { IBookmarkFolder as BookmarkFolderType } from '@ts/bookmark';
import { truncateText } from '@utils';
import { memo } from 'react';

const BookmarkFolder = ({ bookmark }: { bookmark: BookmarkFolderType }) => {
  const { title } = bookmark;
  const { addBreadcrumb } = useBookmarks();
  const { handleContextMenu } = useBookmarkContextMenu();

  return (
    <button
      onClick={() => addBreadcrumb(bookmark)}
      onContextMenu={(e) => handleContextMenu(e, bookmark)}
      className="gap-auto relative flex w-full cursor-pointer flex-col items-center justify-start transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-lg"
    >
      <div className="mb-3 flex h-15 w-15 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 dark:bg-white">
        <FaFolder className="h-9 w-9 text-white dark:text-black" />
      </div>
      <span className="text-center text-sm font-medium text-gray-700 transition-colors group-hover:text-black dark:text-gray-300 dark:group-hover:text-white">
        {truncateText(title, 25)}
      </span>
    </button>
  );
};

export default memo(BookmarkFolder);
