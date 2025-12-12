import { memo } from 'react';

import SearchEngineSelector from '@components/SearchEngineSelector';
import SettingsSection from '@components/settings/SettingsSection';
import Switch from '@components/Switch';
import useTheme from '@hooks/useTheme';

const GeneralSettings = () => {
  const { hideQuote, toggleHideQuote } = useTheme();

  return (
    <div className="animate-in fade-in slide-in-from-right-4 flex flex-col gap-8 duration-300">
      <SettingsSection
        title="Search Engine"
        component={<SearchEngineSelector />}
      />
      <div className="flex flex-row justify-start gap-10">
        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Hide Today's Quote</p>
        <Switch
          checked={hideQuote}
          onChange={toggleHideQuote}
        />
      </div>
    </div>
  );
};

export default memo(GeneralSettings);
