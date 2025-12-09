import { memo } from 'react';

import BackgroundImages from '@components/BackgroundImages';
import CustomBackground from '@components/CustomBackground';
import SettingsSection from '@components/settings/SettingsSection';
import SwitchTheme from '@components/SwitchTheme';

const AppearanceSettings = () => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 flex flex-col gap-8 duration-300">
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
    </div>
  );
};

export default memo(AppearanceSettings);
