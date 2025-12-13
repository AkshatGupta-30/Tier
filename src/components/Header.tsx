import { useNavigate } from 'react-router-dom';
import { MdSettings } from 'react-icons/md';

import { ROUTES } from '@constants/routes';

import TierLogo from './Logo';
import SearchBar from './SearchBar';
import { GoDownload } from 'react-icons/go';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 flex w-full max-w-7xl items-center justify-between gap-10 rounded-2xl bg-white/10 p-2.5 px-5.5 shadow-lg ring-1 shadow-black/5 ring-white/20 backdrop-blur-xl transition-all duration-300 dark:bg-black/40 dark:shadow-black/20 dark:ring-white/10">
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row items-center gap-2">
          <TierLogo size={32} />
        </div>
      </div>

      <div className="flex w-full flex-1 items-center">
        <SearchBar />
      </div>

      <div className="flex flex-row items-center gap-5">
        <button className="flex items-center justify-end">
          <GoDownload className="aspect-square size-7 transform cursor-pointer text-black/70 transition-all duration-300 ease-in-out hover:scale-110 hover:text-black dark:text-white/70 dark:hover:text-white" />
        </button>

        <button
          className="flex items-center justify-end"
          onClick={() => navigate(ROUTES.SETTINGS)}
        >
          <MdSettings className="aspect-square size-8 transform cursor-pointer text-black/70 transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-90 hover:text-black dark:text-white/70 dark:hover:text-white" />
        </button>
      </div>
    </header>
  );
};

export default Header;
