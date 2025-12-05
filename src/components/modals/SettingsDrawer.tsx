import { useState } from 'react';
import { IoMdSettings, IoMdColorPalette } from 'react-icons/io';

import BackgroundImages from '@components/BackgroundImages';
import CustomBackground from '@components/CustomBackground';
import SearchEngineSelector from '@components/SearchEngineSelector';
import SwitchTheme from '@components/SwitchTheme';
import useTheme from '@hooks/useTheme';

type TabType = 'general' | 'appearance';

interface SettingsSectionProps {
  title: string;
  component: React.ReactNode;
}

const SettingsSection = ({ title, component }: SettingsSectionProps) => {
  return (
    <section className="flex w-full flex-col gap-3">
      <label className="text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {title}
      </label>
      {component}
    </section>
  );
};

const SettingsDrawer = () => {
  const { backgroundColor } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const NavItem = ({
    id,
    label,
    icon: Icon,
  }: {
    id: TabType;
    label: string;
    icon: React.ElementType;
  }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
        activeTab === id
          ? 'bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400'
          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5'
      }`}
    >
      <Icon className="text-lg" />
      {label}
    </button>
  );

  return (
    <div className={`flex h-full w-full flex-row overflow-hidden bg-white dark:bg-zinc-900 ${backgroundColor?.classes}`}>
      <aside className="flex w-48 shrink-0 flex-col gap-2 border-r border-gray-100 bg-gray-50/50 p-4 dark:border-white/10 dark:bg-black/20">
        <NavItem id="general" label="General" icon={IoMdSettings} />
        <NavItem id="appearance" label="Appearance" icon={IoMdColorPalette} />
      </aside>

      {/* Content */}
      <div className="flex-1 w-full scrollbar-hidden overflow-y-auto p-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10">
        <div className="flex w-full flex-col gap-10">
          {activeTab === 'general' && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
             
              <SettingsSection
                title="Search Engine"
                component={<SearchEngineSelector />}
              />
            </div>
          )}

          {activeTab === 'appearance' && (
             <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <SettingsSection
                title="Theme Mode"
                component={<SwitchTheme />}
              />
              <SettingsSection
                title="Wallpaper"
                component={<BackgroundImages />}
              />
              <SettingsSection
                title="Accent Color"
                component={<CustomBackground />}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsDrawer;
