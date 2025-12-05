import { useState, useCallback } from 'react';
import { IoMdColorPalette, IoMdSettings } from 'react-icons/io';

import AppearanceSettings from '@components/settings/AppearanceSettings';
import GeneralSettings from '@components/settings/GeneralSettings';
import NavItem from '@components/settings/NavItem';
import SettingsHeader from '@components/settings/SettingsHeader';
import { SettingsTabEnum } from '@constants/settings';
import useTheme from '@hooks/useTheme';

const SettingsModal = () => {
  const { backgroundColor } = useTheme();
  const [activeTab, setActiveTab] = useState<SettingsTabEnum>(SettingsTabEnum.GENERAL);

  const handleTabChange = useCallback((tab: SettingsTabEnum) => {
    setActiveTab(tab);
  }, []);

  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden rounded-2xl ${backgroundColor?.classes}`}
    >
      <SettingsHeader />
      <div className="flex w-full flex-1 flex-row overflow-hidden">
        <aside className="flex w-48 shrink-0 flex-col gap-2 border-r border-gray-100 bg-gray-50/50 p-4 dark:border-white/10 dark:bg-black/20">
          <NavItem
            id={SettingsTabEnum.GENERAL}
            label="General"
            icon={IoMdSettings}
            isActive={activeTab === SettingsTabEnum.GENERAL}
            onSelect={handleTabChange}
          />
          <NavItem
            id={SettingsTabEnum.APPEARANCE}
            label="Appearance"
            icon={IoMdColorPalette}
            isActive={activeTab === SettingsTabEnum.APPEARANCE}
            onSelect={handleTabChange}
          />
        </aside>

        {/* Content */}
        <div className="scrollbar-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10 w-full flex-1 overflow-y-auto p-8">
          <div className="flex flex-1 flex-col gap-10">
            {activeTab === SettingsTabEnum.GENERAL && <GeneralSettings />}
            {activeTab === SettingsTabEnum.APPEARANCE && <AppearanceSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
