import { memo, useState } from 'react';

import BackgroundImages from '@components/BackgroundImages';
import CustomBackground from '@components/CustomBackground';
import SettingsSection from '@components/settings/SettingsSection';
import SwitchTheme from '@components/SwitchTheme';
import NewTabPreview from '@components/NewTabPreview';

const AppearanceSettings = () => {
  const [showPreview, setShowPreview] = useState(false);

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
      <button
        className="absolute top-0 right-0 cursor-pointer rounded-lg bg-black p-2 font-bold text-white dark:bg-white dark:text-black"
        onClick={() => setShowPreview(true)}
      >
        Show Preview
      </button>

      <NewTabPreview
        isOpen={showPreview}
        setVisible={setShowPreview}
      />
    </div>
  );
};

export default memo(AppearanceSettings);
