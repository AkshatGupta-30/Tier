import { MdSettings } from 'react-icons/md';

import { MODAL_TYPES } from '@constants/modals';

import TierLogo from './Logo';
import SearchBar from './SearchBar';
import Modal from './modals';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full h-16 flex items-center justify-between bg-black/50 backdrop-blur-md p-2.5">
      <div className="flex flex-row w-full items-center gap-4">
        {/* <Activity mode={isHomePage ? 'hidden' : 'visible'}>
          <FaArrowLeft
            className="aspect-square size-6 text-white/90 transform hover:scale-105 hover:text-white cursor-pointer transition-all duration-250 ease-in-out"
            role="button"
            onClick={() => navigate(-1)}
          />
        </Activity> */}
        <div className="flex flex-row items-center gap-2">
          <TierLogo size={32} />
          {/* <p className="text-white/90 text-3xl font-bold">{APP_NAME}</p> */}
        </div>
      </div>

      <SearchBar />

      <div className="flex w-full items-center justify-end">
        <MdSettings
          className="aspect-square size-8 text-white/90 transform hover:scale-105 hover:text-white cursor-pointer transition-all duration-250 ease-in-out"
          onClick={() =>
            Modal.open({ openModalType: MODAL_TYPES.SETTINGS, childrenProps: undefined })
          }
        />
      </div>
    </header>
  );
};

export default Header;
