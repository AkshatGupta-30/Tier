import { memo } from 'react';

import BackgroundImages from '@components/BackgroundImages';
import CustomBackground from '@components/CustomBackground';
import SettingsSection from '@components/settings/SettingsSection';
import SwitchTheme from '@components/SwitchTheme';

const AppearanceSettings = () => {
  return (
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
  );
};

export default memo(AppearanceSettings);
