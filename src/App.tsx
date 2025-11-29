import { useEffect } from 'react';

import useBookmarks from '@hooks/useBookmarks';
import NewTab from '@pages/NewTab';
import useTheme from '@hooks/useTheme';

const App = () => {
  const { fetchBookmarks } = useBookmarks();
  const { initializeTheme } = useTheme();

  useEffect(() => {
    fetchBookmarks();
    initializeTheme();
  }, []);

  return <NewTab />;
};

export default App;
