import type { ReactNode } from 'react';

import Header from '@components/Header';
import SwitchTheme from '@components/SwitchTheme';

interface SettingsSectionProps {
  title: string;
  component: ReactNode;
}

const SettingsSection = ({ title, component }: SettingsSectionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <label className="text-white text-base font-bold">{title}</label>
      {component}
    </section>
  );
};

const Settings = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-gray-900 via-gray-800 to-black flex flex-col relative overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-col p-10 pt-5">
        <SettingsSection
          title="Theme"
          component={<SwitchTheme />}
        />
      </div>
    </div>
  );
};

export default Settings;
