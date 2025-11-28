import type { ReactNode } from 'react';

import CustomBackground from '@components/CustomBackground';
import Header from '@components/Header';
import SwitchTheme from '@components/SwitchTheme';

interface SettingsSectionProps {
  title: string;
  component: ReactNode;
}

const SettingsSection = ({ title, component }: SettingsSectionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <label className="text-white text-base font-bold px-10">{title}</label>
      {component}
    </section>
  );
};

const Settings = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-col pt-5 gap-8">
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

export default Settings;
