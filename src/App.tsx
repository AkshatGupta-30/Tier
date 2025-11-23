import { useEffect } from 'react';

import useBookmarks from '@hooks/useBookmarks';
import NewTab from '@pages/newTab/NewTab';

const App = () => {
  const { fetchBookmarks } = useBookmarks();

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return <NewTab />;
};

export default App;
