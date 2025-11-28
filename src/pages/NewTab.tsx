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
      className="relative min-h-screen max-h-screen w-full bg-linear-to-br from-gray-900 via-gray-800 to-black flex flex-col"
      onContextMenu={handleEmptySpaceContextMenu}
    >
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <Header />

      {/* Content */}
      <main className="z-10 flex flex-1 flex-col p-10 gap-5 pt-5 items-center w-full overflow-y-auto animate-fade-in scrollbar-hidden">
        {/* <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400 mb-2">
            Good Evening
          </h1>
          <p className="text-gray-400">What would you like to discover today?</p>
        </div> */}
        <BreadCrumb/>
        <BookmarkSection bookmarks={bookmarks ?? []} />
      </main>
    </div>
  );
};

export default NewTab;
