import { useState, type MouseEvent } from 'react';

import store, { useAppDispatch, useAppSelector } from '@store';
import {
  bookmarkState,
  showContextMenu,
  hideContextMenu as removeContextMenu,
  selectCurrentFolder,
} from '@store/slices/bookmark';
import type { IBookmark, IBookmarkFolder, IBookmarkItem } from '@ts/bookmark';

import useBookmarks from './useBookmarks';

const useBookmarkContextMenu = () => {
  const dispatch = useAppDispatch();
  const { contextMenu } = useAppSelector(bookmarkState);
  const { bookmark } = contextMenu;

  const {
    addBreadcrumb,
    removeBookmark,
    addBookmark,
    updateBookmark,
    addFolder,
    removeFolder,
    updateFolder,
  } = useBookmarks();

  const [cutCopyPasteBookmark, setCutCopyPasteBookmark] = useState<IBookmarkItem | null>(null);

  const isFolder = bookmark && Object.hasOwn(bookmark, 'children');

  const handleContextMenu = (e: MouseEvent, bookmark: IBookmarkItem) => {
    e.stopPropagation();
    e.preventDefault();
    const { pageX: x, pageY: y } = e;
    dispatch(
      showContextMenu({
        coordinates: { x, y },
        bookmark,
      }),
    );
  };

  const handleEmptySpaceContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    const { pageX: x, pageY: y } = e;

    const state = store.getState();
    const currentFolder = selectCurrentFolder(state);

    dispatch(
      showContextMenu({
        coordinates: { x, y },
        bookmark: currentFolder!,
        isEmptySpace: true,
      }),
    );
  };

  const hideContextMenu = () => {
    dispatch(removeContextMenu());
  };

  const openBookmark = () => {
    if (!bookmark) return;
    if (isFolder) addBreadcrumb(bookmark as IBookmarkFolder);
    else window.open((bookmark as IBookmark).url);
  };

  const renameBookmark = (newBookmark: IBookmarkItem) => {
    if (!bookmark) return;
    if (Object.hasOwn(newBookmark, 'children')) {
      updateFolder(newBookmark as IBookmark);
    } else {
      updateBookmark(newBookmark as IBookmark);
    }
  };

  const cutBookmark = () => {
    if (!bookmark) return;
    setCutCopyPasteBookmark(bookmark);
    if (isFolder) removeFolder(bookmark.id!);
    else removeBookmark(bookmark.id!);
  };

  const copyBookmark = () => {
    if (!bookmark) return;
    setCutCopyPasteBookmark(bookmark);
  };

  const pasteBookmark = (parentId: string) => {
    if (!cutCopyPasteBookmark) return;
    if (isFolder) addFolder({ ...(cutCopyPasteBookmark as IBookmarkFolder), parentId });
    else addBookmark({ ...(cutCopyPasteBookmark as IBookmark), parentId });
    setCutCopyPasteBookmark(null);
  };

  const deleteBookmark = () => {
    if (!bookmark) return;
    if (isFolder) removeFolder(bookmark.id!);
    else removeBookmark(bookmark.id!);
  };

  return {
    ...contextMenu,
    handleContextMenu,
    handleEmptySpaceContextMenu,
    hideContextMenu,
    openBookmark,
    renameBookmark,
    cutBookmark,
    copyBookmark,
    pasteBookmark,
    deleteBookmark,
    addBookmark,
  };
};

export default useBookmarkContextMenu;
