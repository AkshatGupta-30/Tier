import type { FC } from 'react';

import type { IBookmark, IBookmarkFolder, IBookmarkItem } from '@ts/bookmark';

import Bookmark from './Bookmark';
import BookmarkFolder from './BookmarkFolder';

interface BookmarkSectionProps {
  bookmarks: IBookmarkItem[];
}

const BookmarkSection: FC<BookmarkSectionProps> = ({ bookmarks }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-8 w-full p-10">
      {bookmarks?.map((bookmark) => {
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
    </div>
  );
};

export default BookmarkSection;
