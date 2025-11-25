export interface IBookmark {
  url: string;
  id: string;
  title: string;
  parentId: string;
}

export interface IBookmarkFolder {
  children: IBookmarkItem[];
  id: string;
  title: string;
  parentId: string;
}

export type IBreadcrumbNode = Omit<IBookmarkFolder, 'children'>;

export type IBookmarkItem = Partial<IBookmark> & Partial<IBookmarkFolder>;

export enum ContextMenuPosition {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}