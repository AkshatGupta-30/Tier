import { useState, useEffect } from 'react';
import type { IBookmark } from '@ts/bookmark';

const useTopSites = () => {
  const [topSites, setTopSites] = useState<IBookmark[]>([]);

  useEffect(() => {
    // Check if chrome.topSites API is available
    if (chrome?.topSites?.get) {
      chrome.topSites.get((data) => {
        const mappedSites = data.map((site) => ({
          id: site.url, // Use URL as unique ID for top sites
          title: site.title,
          url: site.url,
          parentId: 'top-sites',
        })) as IBookmark[];
        setTopSites(mappedSites);
      });
    }
  }, []);

  return { topSites };
};

export default useTopSites;
