import type { ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

import BackgroundImages from '@components/BackgroundImages';
import CustomBackground from '@components/CustomBackground';
import SearchEngineSelector from '@components/SearchEngineSelector';
import SwitchTheme from '@components/SwitchTheme';
import useTheme from '@hooks/useTheme';

import Modal from '.';

interface SettingsSectionProps {
  title: string;
  component: ReactNode;
}

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

const SettingsSection = ({ title, component }: SettingsSectionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <label className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</label>
      {component}
    </section>
  );
};

const SettingsModal = () => {
  const { backgroundColor } = useTheme();
  return (
    <div
      className={`relative flex max-h-[85vh] w-full flex-1 flex-col overflow-hidden rounded-2xl border-transparent shadow-2xl hover:border-black/10 dark:hover:border-white/10 ${backgroundColor?.classes}`}
    >
      <SettingsHeader />
      <div className={'scrollbar-hidden flex flex-1 flex-col gap-10 overflow-y-auto p-8'}>
        <SettingsSection
          title="Theme Mode"
          component={<SwitchTheme />}
        />
        <SettingsSection
          title="Background Image"
          component={<BackgroundImages />}
        />
        <SettingsSection
          title="Theme Color"
          component={<CustomBackground />}
        />
        <SettingsSection
          title="Search Engine"
          component={<SearchEngineSelector />}
        />
      </div>
    </div>
  );
};

export default SettingsModal;
