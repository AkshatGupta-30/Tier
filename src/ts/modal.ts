import type { IBookmarkItem } from './bookmark';

export interface CreateBookmarkModalProps {
  parentId: string;
  bookmark?: Omit<IBookmarkItem, 'parentId'>;
  createFolder?: boolean;
}

export interface ModalPropsMap {
  CREATE_BOOKMARK: CreateBookmarkModalProps;
  SETTINGS: object;
}
