import { memo } from 'react';

import SearchEngineSelector from '@components/SearchEngineSelector';
import SettingsSection from '@components/settings/SettingsSection';

const GeneralSettings = () => {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <SettingsSection
        title="Search Engine"
        component={<SearchEngineSelector />}
      />
    </div>
  );
};

export default memo(GeneralSettings);
