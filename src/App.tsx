import { useEffect } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import ToastContainer from '@components/ToastContainer';
import Settings from '@components/settings';
import { ROUTES } from '@constants/routes';
import useBookmarks from '@hooks/useBookmarks';
import useTheme from '@hooks/useTheme';
import NewTab from '@pages/NewTab';

const routes = [
  {
    path: ROUTES.HOME,
    element: <NewTab />,
  },
  {
    path: ROUTES.SETTINGS,
    element: <Settings />,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ['/'], // Start path
  initialIndex: 0,
});

const App = () => {
  const { fetchBookmarks } = useBookmarks();
  const { initializeTheme } = useTheme();

  useEffect(() => {
    fetchBookmarks();
    initializeTheme();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
