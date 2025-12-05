import { useState } from 'react';
import { IoMdColorPalette, IoMdSettings } from 'react-icons/io';

import BackgroundImages from '@components/BackgroundImages';
import CustomBackground from '@components/CustomBackground';
import SearchEngineSelector from '@components/SearchEngineSelector';
import NavItem from '@components/settings/NavItem';
import SettingsHeader from '@components/settings/SettingsHeader';
import SettingsSection from '@components/settings/SettingsSection';
import SwitchTheme from '@components/SwitchTheme';
import { SettingsTabEnum } from '@constants/settings';
import useTheme from '@hooks/useTheme';

const SettingsModal = () => {
  const { backgroundColor } = useTheme();
  const [activeTab, setActiveTab] = useState<SettingsTabEnum>(SettingsTabEnum.GENERAL);
  return (
    <div className={`flex h-full w-full flex-col rounded-2xl overflow-hidden ${backgroundColor?.classes}`}>
      <SettingsHeader />
    <div className="flex flex-1 w-full flex-row overflow-hidden">
      <aside className="flex w-48 shrink-0 flex-col gap-2 border-r border-gray-100 bg-gray-50/50 p-4 dark:border-white/10 dark:bg-black/20">
        <NavItem
          label="General"
          icon={IoMdSettings}
          isActive={activeTab === SettingsTabEnum.GENERAL}
          onClick={() => setActiveTab(SettingsTabEnum.GENERAL)}
        />
        <NavItem
          label="Appearance"
          icon={IoMdColorPalette}
          isActive={activeTab === SettingsTabEnum.APPEARANCE}
          onClick={() => setActiveTab(SettingsTabEnum.APPEARANCE)}
        />
      </aside>

      {/* Content */}
      <div className="flex-1 w-full scrollbar-hidden overflow-y-auto p-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10">
        <div className="flex flex-1 flex-col gap-10">
          {activeTab === SettingsTabEnum.GENERAL && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <SettingsSection
                title="Search Engine"
                component={<SearchEngineSelector />}
              />
            </div>
          )}

          {activeTab === SettingsTabEnum.APPEARANCE && (
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
    </div>
  );
};

export default SettingsModal;
