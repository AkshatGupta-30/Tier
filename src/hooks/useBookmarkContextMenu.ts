import { useState, type MouseEvent } from 'react';

import { useAppDispatch, useAppSelector } from '@store';
import {
  bookmarkState,
  showContextMenu,
  hideContextMenu as removeContextMenu,
} from '@store/slices/bookmark';
import type { IBookmark, IBookmarkFolder, IBookmarkItem } from '@ts/bookmark';

import useBookmarks from './useBookmarks';

const useBookmarkContextMenu = () => {
  const dispatch = useAppDispatch();
  const { contextMenu } = useAppSelector(bookmarkState);
  const { visible, coordinates, bookmark } = contextMenu;

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
    e.preventDefault();
    const { pageX: x, pageY: y } = e;
    dispatch(
      showContextMenu({
        coordinates: { x, y },
        bookmark,
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
    visible,
    coordinates,
    bookmark,
    handleContextMenu,
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
