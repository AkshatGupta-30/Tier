import BookmarkSection from '@components/BookmarkSection';
import useBookmarks from '@hooks/useBookmarks';
import Header from '@components/Header';

const NewTab = () => {
  const { bookmarks } = useBookmarks();

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-gray-900 via-gray-800 to-black flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Settings Button */}
      <Header />

      {/* Content */}
      <main className="z-10 flex flex-col items-center w-full animate-fade-in">
        {/* <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400 mb-2">
            Good Evening
          </h1>
          <p className="text-gray-400">What would you like to discover today?</p>
        </div> */}

        {/* <SearchBar /> */}
        <BookmarkSection bookmarks={bookmarks ?? []} />
      </main>
    </div>
  );
};

export default NewTab;
