import type { ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

import CustomBackground from '@components/CustomBackground';
import SwitchTheme from '@components/SwitchTheme';
import useTheme from '@hooks/useTheme';

import Modal from '.';

interface SettingsSectionProps {
  title: string;
  component: ReactNode;
}

const SettingsHeader = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-black/50 py-2.5 pr-3 pl-6 backdrop-blur-md">
      <div className="flex w-full flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-2">
          <p className="text-3xl font-bold text-white">Settings</p>
        </div>
        <button
          className="cursor-pointer p-2"
          onClick={() => Modal.close()}
        >
          <IoMdClose className="text-xl text-white" />
        </button>
      </div>
    </header>
  );
};

const SettingsSection = ({ title, component }: SettingsSectionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <label className="px-10 text-base font-bold text-black dark:text-white">{title}</label>
      {component}
    </section>
  );
};

const SettingsModal = () => {
  const { backgroundColor } = useTheme();
  return (
    <div
      className={`relative flex max-h-full flex-1 flex-col overflow-hidden rounded-xl ${backgroundColor.classes}`}
    >
      <SettingsHeader />
      <div className={'scrollbar-hidden flex flex-1 flex-col gap-8 overflow-y-auto py-5'}>
        <SettingsSection
          title="Theme"
          component={<SwitchTheme />}
        />
        <SettingsSection
          title="Background"
          component={<CustomBackground />}
        />
      </div>
    </div>
  );
};

export default SettingsModal;
