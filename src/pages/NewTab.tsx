import BookmarkSection from '@components/BookmarkSection';
import BreadCrumb from '@components/BreadCrumb';
import Header from '@components/Header';
import useBookmarks from '@hooks/useBookmarks';
import useBookmarkContextMenu from '@hooks/useBookmarkContextMenu';

const NewTab = () => {
  const { bookmarks } = useBookmarks();
  const { handleEmptySpaceContextMenu } = useBookmarkContextMenu();

  return (
    <div
      className="relative flex max-h-screen min-h-screen w-full flex-col"
      onContextMenu={handleEmptySpaceContextMenu}
    >
      <Header />
      {/* Content */}
      <main className="animate-fade-in scrollbar-hidden z-10 flex w-full flex-1 flex-col items-center gap-5 overflow-y-auto p-10 pt-5">
        {/* <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400 mb-2">
            Good Evening
          </h1>
          <p className="text-gray-400">What would you like to discover today?</p>
        </div> */}
        <BreadCrumb />
        <BookmarkSection bookmarks={bookmarks ?? []} />
      </main>
    </div>
  );
};

export default NewTab;
