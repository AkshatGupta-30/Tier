import { memo } from 'react';

import { LABELS } from '@constants/label';
import useTopSites from '@hooks/useTopSites';

import Site from './Site';

const { TOP_SITES } = LABELS;

const TopSitesSection = () => {
  const { topSites } = useTopSites();

  if (!topSites.length) return null;

  return (
    <div className="flex max-h-48 flex-col justify-between gap-3">
      <p className={`text-lg font-bold text-black/90 dark:text-white/90`}>{TOP_SITES}</p>
      <div className="flex w-full items-start justify-center gap-8 overflow-y-visible">
        {topSites.map((site) => (
          <Site
            key={site.url}
            site={site}
            topSite
          />
        ))}
      </div>
    </div>
  );
};

export default memo(TopSitesSection);
