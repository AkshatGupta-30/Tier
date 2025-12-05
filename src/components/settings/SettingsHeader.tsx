import { IoMdClose } from 'react-icons/io';

import Modal from '@components/modals';

const SettingsHeader = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/80">
      <div className="flex w-full flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-2">
          <p className="text-2xl font-bold text-black dark:text-white">Settings</p>
        </div>
        <button
          className="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
          onClick={() => Modal.close()}
        >
          <IoMdClose className="text-xl text-black dark:text-white" />
        </button>
      </div>
    </header>
  );
};

export default SettingsHeader;
