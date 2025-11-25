import { FaArrowLeft } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';

import TierLogo from './Logo';
import BreadCrumb from './BreadCrumb';
import { Activity } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isNotHomePage = location.pathname !== ROUTES.HOME;

  return (
    <header className="w-full h-16 flex items-center justify-between bg-black/50 p-2.5">
      <div className="flex flex-row w-full items-center gap-4">
        <Activity mode={isNotHomePage ? 'visible' : 'hidden'}>
          <FaArrowLeft
            className="aspect-square size-6 text-white/90 transform hover:scale-105 hover:text-white cursor-pointer transition-all duration-250 ease-in-out"
            role="button"
            onClick={() => navigate(-1)}
          />
        </Activity>
        <div className="flex flex-row items-center gap-2">
          <TierLogo size={32} />
          {/* <p className="text-white/90 text-3xl font-bold">{APP_NAME}</p> */}
        </div>
      </div>

      <BreadCrumb />
      <div className="flex w-full items-center justify-end">
        <MdSettings
          className="aspect-square size-8 text-white/90 transform hover:scale-105 hover:text-white cursor-pointer transition-all duration-250 ease-in-out"
          onClick={() => navigate(ROUTES.SETTINGS)}
        />
      </div>
    </header>
  );
};

export default Header;
