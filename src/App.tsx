import { useEffect } from 'react';

import useBookmarks from '@hooks/useBookmarks';
import NewTab from '@pages/NewTab';
import useTheme from '@hooks/useTheme';

const App = () => {
  const { fetchBookmarks } = useBookmarks();
  const { initializeTheme, backgroundImage } = useTheme();

  useEffect(() => {
    fetchBookmarks();
    initializeTheme();
  }, []);

  return (
    <>
      {backgroundImage?.value && (
        <img
          src={backgroundImage.value}
          alt="background"
          className="fixed top-0 left-0 -z-10 h-screen w-screen object-cover"
        />
      )}
      <NewTab />
    </>
  );
};

export default App;
