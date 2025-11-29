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
      className="relative min-h-screen max-h-screen w-full flex flex-col"
      onContextMenu={handleEmptySpaceContextMenu}
    >
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
