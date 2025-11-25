import { memo } from 'react';

import useBookmarkContextMenu from '@hooks/useBookmarkContextMenu';
import type { IBookmark } from '@ts/bookmark';
import { getFaviconUrl, truncateText } from '@utils';

const Bookmark = ({ bookmark }: { bookmark: IBookmark }) => {
  const { title, url } = bookmark;
  const { handleContextMenu } = useBookmarkContextMenu();

  const faviconUrl = getFaviconUrl(url);

  return (
    <a
      href={url}
      onContextMenu={(e) => handleContextMenu(e, bookmark)}
      className="relative w-24 flex flex-col items-center justify-start gap-auto transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-lg cursor-pointer"
    >
      <div className="min-w-15 min-h-15 mb-3 rounded-lg bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <img
          src={faviconUrl}
          alt={title}
          className="w-9 h-9 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
        />
      </div>
      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors text-center">
        {truncateText(title, 25)}
      </span>
    </a>
  );
};

export default memo(Bookmark);
