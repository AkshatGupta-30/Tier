import { memo } from 'react';

import useBookmarkContextMenu from '@hooks/useBookmarkContextMenu';
import type { IBookmark } from '@ts/bookmark';
import { getFaviconUrl, truncateText } from '@utils';

interface ISiteProps {
  site: IBookmark;
  topSite?: boolean;
}

const Site = ({ site, topSite: isTopSite }: ISiteProps) => {
  const { title, url } = site;
  const { handleContextMenu } = useBookmarkContextMenu();

  const faviconUrl = url ? getFaviconUrl(url) : '';

  return (
    <a
      href={url}
      onContextMenu={(e) => !isTopSite && handleContextMenu(e, site)}
      className="gap-auto relative flex w-full cursor-pointer flex-col items-center justify-start transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-lg"
    >
      <div className="mb-3 flex min-h-15 min-w-15 items-center justify-center rounded-lg bg-black/10 transition-transform duration-300 group-hover:scale-110 dark:bg-white/10">
        <img
          src={faviconUrl}
          alt={title}
          className="h-9 w-9 object-contain opacity-80 transition-opacity group-hover:opacity-100"
        />
      </div>
      <span className="line-clamp-2 text-center text-sm font-medium text-gray-700 transition-colors group-hover:text-black dark:text-gray-300 group-hover:dark:text-white">
        {truncateText(title, 25)}
      </span>
    </a>
  );
};

export default memo(Site);
