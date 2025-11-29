import { useEffect } from 'react';

import useBookmarks from '@hooks/useBookmarks';
import NewTab from '@pages/NewTab';
import useTheme from '@hooks/useTheme';

const App = () => {
  const { fetchBookmarks } = useBookmarks();
  const { backgroundOptionIndex, switchBackgroundOption } = useTheme();

  useEffect(() => {
    fetchBookmarks();
    switchBackgroundOption(backgroundOptionIndex);
  }, []);

  return <NewTab />;
};

export default App;
