import { MdSettings } from 'react-icons/md';

import { MODAL_TYPES } from '@constants/modals';

import TierLogo from './Logo';
import SearchBar from './SearchBar';
import Modal from './modals';

const Header = () => {
  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 flex w-[95%] max-w-7xl items-center justify-between rounded-2xl bg-white/10 p-2.5 shadow-lg ring-1 shadow-black/5 ring-white/20 backdrop-blur-xl transition-all duration-300 dark:bg-black/40 dark:shadow-black/20 dark:ring-white/10">
      <div className="flex w-30 flex-row items-center gap-4">
        <div className="flex flex-row items-center gap-2 pl-2">
          <TierLogo size={32} />
        </div>
      </div>

      <div className="flex flex-1 items-center">
        <SearchBar />
      </div>

      <div className="flex w-30 items-center justify-end pr-2">
        <MdSettings
          className="aspect-square size-8 transform cursor-pointer text-black/70 transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-90 hover:text-black dark:text-white/70 dark:hover:text-white"
          onClick={() => Modal.open({ openModalType: MODAL_TYPES.SETTINGS })}
        />
      </div>
    </header>
  );
};

export default Header;
