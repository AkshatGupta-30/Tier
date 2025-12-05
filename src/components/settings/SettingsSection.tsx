import { memo, type ReactNode } from 'react';

interface SettingsSectionProps {
  title: string;
  component: ReactNode;
}

const SettingsSection = ({ title, component }: SettingsSectionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <label className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</label>
      {component}
    </section>
  );
};

export default memo(SettingsSection);
