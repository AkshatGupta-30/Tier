import { memo } from 'react';

import BookmarkSection from '@components/BookmarkSection';
import BreadCrumb from '@components/BreadCrumb';
import Header from '@components/Header';
import useBookmarks from '@hooks/useBookmarks';
import useBookmarkContextMenu from '@hooks/useBookmarkContextMenu';
import QuoteOfTheDay from '@components/QuoteOfTheDay';
import TopSitesSection from '@components/TopSitesSection';
import useTheme from '@hooks/useTheme';

const NewTab = () => {
  const { bookmarks } = useBookmarks();
  const { handleEmptySpaceContextMenu } = useBookmarkContextMenu();
  const { backgroundImage, backgroundBlur, backgroundOverlay } = useTheme();

  return (
    <div
      className="relative flex max-h-screen min-h-screen w-full flex-col px-10"
      onContextMenu={handleEmptySpaceContextMenu}
    >
      {(backgroundImage?.value || backgroundOverlay > 0) && (
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
          {backgroundImage?.value && (
            <img
              src={backgroundImage.value}
              alt="background"
              className="h-full w-full object-cover"
              style={{ filter: `blur(${backgroundBlur}px)` }}
            />
          )}
          <div
            className="absolute inset-0 bg-black transition-all duration-300 ease-in-out"
            style={{ opacity: backgroundOverlay / 100 }}
          />
        </div>
      )}
      <Header />
      <main className="animate-fade-in scrollbar-hidden z-10 flex w-full flex-1 flex-col items-center gap-8 overflow-y-auto pt-10">
        <QuoteOfTheDay />
        <TopSitesSection />
        <BreadCrumb />
        <BookmarkSection bookmarks={bookmarks ?? []} />
      </main>
    </div>
  );
};

export default memo(NewTab);
