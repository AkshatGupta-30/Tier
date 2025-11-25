import type { IBreadcrumbNode } from '@ts/bookmark';

import { ROUTES } from './routes';

export const BREADCRUMBS: Record<string, IBreadcrumbNode> = {
  [ROUTES.HOME]: {
    id: '1',
    title: 'Bookmark Bar',
    parentId: '0',
  },
  [ROUTES.SETTINGS]: {
    id: '1.1',
    title: 'Settings',
    parentId: '0.0',
  },
};
