import { memo } from 'react';

import BackgroundImages from '@components/BackgroundImages';
import CustomBackground from '@components/CustomBackground';
import SettingsSection from '@components/settings/SettingsSection';
import SwitchTheme from '@components/SwitchTheme';
import FilterSettings from './FilterSettings';

const AppearanceSettings = () => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 relative flex flex-col gap-8 overflow-y-auto duration-300">
      <SettingsSection
        title="Theme Mode"
        component={<SwitchTheme />}
      />
      <SettingsSection
        title="Accent Color"
        component={<CustomBackground />}
      />
      <SettingsSection
        title="Wallpaper"
        component={<BackgroundImages />}
      />
      <SettingsSection
        title="Filters"
        component={<FilterSettings />}
      />
    </div>
  );
};

export default memo(AppearanceSettings);
