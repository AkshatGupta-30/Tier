import { FaFolder } from 'react-icons/fa';

import useBookmarks from '@hooks/useBookmarks';
import useBookmarkContextMenu from '@hooks/useBookmarkContextMenu';
import type { IBookmarkFolder as BookmarkFolderType } from '@ts/bookmark';
import { truncateText } from '@utils';

const BookmarkFolder = ({ bookmark }: { bookmark: BookmarkFolderType }) => {
  const { title } = bookmark;
  const { addBreadcrumb } = useBookmarks();
  const { handleContextMenu } = useBookmarkContextMenu();

  return (
    <button
      onClick={() => addBreadcrumb(bookmark)}
      onContextMenu={(e) => handleContextMenu(e, bookmark)}
      className="relative w-24 flex flex-col items-center justify-start gap-auto transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-lg cursor-pointer"
    >
      <div className="w-15 h-15 mb-3 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <FaFolder className="w-9 h-9" />
      </div>
      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors text-center">
        {truncateText(title, 25)}
      </span>
    </button>
  );
};

export default BookmarkFolder;
