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
  const { backgroundImage } = useTheme();

  return (
    <div
      className="relative flex max-h-screen min-h-screen w-full flex-col"
      onContextMenu={handleEmptySpaceContextMenu}
    >
      {backgroundImage?.value && (
        <img
          src={backgroundImage.value}
          alt="background"
          className="fixed top-0 left-0 -z-10 h-screen w-screen object-cover"
        />
      )}
      <Header />
      <main className="animate-fade-in scrollbar-hidden z-10 flex w-full flex-1 flex-col items-center gap-8 overflow-y-auto p-10 pt-10">
        <QuoteOfTheDay />
        <TopSitesSection />
        <BreadCrumb />
        <BookmarkSection bookmarks={bookmarks ?? []} />
      </main>
    </div>
  );
};

export default NewTab;
