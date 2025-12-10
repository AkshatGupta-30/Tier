import { useEffect } from 'react';

import useBookmarks from '@hooks/useBookmarks';
import NewTab from '@pages/NewTab';
import useTheme from '@hooks/useTheme';
import ToastContainer from '@components/ToastContainer';

const App = () => {
  const { fetchBookmarks } = useBookmarks();
  const { initializeTheme } = useTheme();

  useEffect(() => {
    fetchBookmarks();
    initializeTheme();
  }, []);

  return (
    <>
      <NewTab />
      <ToastContainer />
    </>
  );
};

export default App;
