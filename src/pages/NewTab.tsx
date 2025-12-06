import BookmarkSection from '@components/BookmarkSection';
import BreadCrumb from '@components/BreadCrumb';
import Header from '@components/Header';
import useBookmarks from '@hooks/useBookmarks';
import useBookmarkContextMenu from '@hooks/useBookmarkContextMenu';
import QuoteOfTheDay from '@components/QuoteOfTheDay';
import TopSitesSection from '@components/TopSitesSection';

const NewTab = () => {
  const { bookmarks } = useBookmarks();
  const { handleEmptySpaceContextMenu } = useBookmarkContextMenu();

  return (
    <div
      className="relative flex max-h-screen min-h-screen w-full flex-col"
      onContextMenu={handleEmptySpaceContextMenu}
    >
      <Header />
      <main className="animate-fade-in scrollbar-hidden z-10 flex w-full flex-1 flex-col items-center gap-8 overflow-y-auto p-10 pt-10">
        <section className="flex w-full flex-row items-center gap-8">
          <QuoteOfTheDay />
          <TopSitesSection />
        </section>
        <BreadCrumb />
        <BookmarkSection bookmarks={bookmarks ?? []} />
      </main>
    </div>
  );
};

export default NewTab;
