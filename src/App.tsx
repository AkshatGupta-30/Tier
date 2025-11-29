import { useEffect } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import useBookmarks from '@hooks/useBookmarks';
import NewTab from '@pages/NewTab';
import Settings from '@pages/Settings';
import useTheme from '@hooks/useTheme';

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
  initialEntries: ['/'],
  initialIndex: 0,
});

const App = () => {
  const { fetchBookmarks } = useBookmarks();
  const { backgroundOptionIndex, switchBackgroundOption } = useTheme();

  useEffect(() => {
    fetchBookmarks();
    switchBackgroundOption(backgroundOptionIndex);
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
