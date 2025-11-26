import type { ReactNode } from 'react';

import Header from '@components/Header';
import SwitchTheme from '@components/SwitchTheme';
import { LABELS } from '@constants/label';
import AccentColorSelection from '@components/AccentColorSelection';

const {THEME,ACCENT_COLOR} = LABELS

interface SettingsSectionProps {
  title: string;
  component: ReactNode;
}

const SettingsSection = ({ title, component }: SettingsSectionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <label className="text-white text-lg font-bold">{title}</label>
      {component}
    </section>
  );
};

const SectionSeparator = () => {
  return <div className="w-full h-px bg-gray-600 my-5" />;
}

const Settings = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-gray-900 via-gray-800 to-black flex flex-col relative overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-col p-5 gap-5">
        <SettingsSection
          title={THEME}
          component={<SwitchTheme />}
        />
        <SectionSeparator />
        <SettingsSection
          title={ACCENT_COLOR}
          component={<AccentColorSelection />}
        />
      </div>
    </div>
  );
};

export default Settings;
