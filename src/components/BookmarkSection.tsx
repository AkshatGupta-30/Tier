import { memo, type FC } from 'react';

import type { IBookmark, IBookmarkFolder, IBookmarkItem } from '@ts/bookmark';

import AddBookmarkButton from './AddBookmarkButton';
import Bookmark from './Bookmark';
import BookmarkFolder from './BookmarkFolder';
import BookmarkMenu from './BookmarkMenu';

interface BookmarkSectionProps {
  bookmarks: IBookmarkItem[];
}

const BookmarkSection: FC<BookmarkSectionProps> = ({ bookmarks }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-8 w-full p-10">
      {bookmarks
        ?.filter(({ children, url }) => url || children)
        ?.map((bookmark) => {
          console.log('🚀 -- BookmarkSection -- bookmark:', bookmark);
          const { id } = bookmark;
          if (Object.hasOwn(bookmark, 'children')) {
            return (
              <BookmarkFolder
                key={id}
                bookmark={bookmark as IBookmarkFolder}
              />
            );
          }

          return (
            <Bookmark
              key={id}
              bookmark={bookmark as IBookmark}
            />
          );
        })}
      <AddBookmarkButton />
      <BookmarkMenu />
    </div>
  );
};

export default memo(BookmarkSection);
