export interface IBookmark {
  url: string;
  id: string;
  title: string;
}

export interface IBookmarkFolder {
  children: IBookmarkItem[];
  id: string;
  title: string;
}

export type IBreadcrumbNode = Omit<IBookmarkFolder, 'children'>;

export type IBookmarkItem = IBookmark | IBookmarkFolder;
