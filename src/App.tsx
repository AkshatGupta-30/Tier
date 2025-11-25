import { useEffect } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import useBookmarks from '@hooks/useBookmarks';
import NewTab from '@pages/NewTab';
import Settings from '@pages/Settings';

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

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
