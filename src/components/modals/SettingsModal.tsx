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
    <header className="sticky top-0 z-50 w-full h-16 flex items-center justify-between bg-black/50 backdrop-blur-md py-2.5 pl-6 pr-3">
      <div className="flex flex-row w-full items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-2">
          <p className="text-white  text-3xl font-bold">Settings</p>
        </div>
        <button
          className="p-2 cursor-pointer "
          onClick={() => Modal.close()}
        >
          <IoMdClose className="text-xl text-white " />
        </button>
      </div>
    </header>
  );
};

const SettingsSection = ({ title, component }: SettingsSectionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <label className="text-black dark:text-white text-base font-bold px-10">{title}</label>
      {component}
    </section>
  );
};

const SettingsModal = () => {
  const { backgroundColor } = useTheme();
  return (
    <div
      className={`max-h-full flex-1 flex flex-col relative overflow-hidden rounded-xl ${backgroundColor.classes}`}
    >
      <SettingsHeader />
      <div className={'flex-1 flex flex-col py-5 gap-8 overflow-y-auto scrollbar-hidden'}>
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
