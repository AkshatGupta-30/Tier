import { createSlice, createSelector } from '@reduxjs/toolkit';

import type { IBookmark, IBookmarkFolder, IBookmarkItem, IBreadcrumbNode } from '@ts/bookmark';

const initialBookmark = {
  id: '1',
  title: 'Bookmark Bar',
  children: [],
};

interface State {
  breadcrumbs: IBreadcrumbNode[];
  bookmarks: IBookmarkFolder;
}

const initialState: State = {
  breadcrumbs: [initialBookmark],
  bookmarks: initialBookmark,
};

const findFolder = (items: IBookmarkItem[], id: string): IBookmarkFolder | undefined => {
  for (const item of items) {
    if (Object.hasOwn(item, 'children')) {
      const bookmarkFolder = item as IBookmarkFolder;
      if (bookmarkFolder.id === id) return bookmarkFolder;
      const found = findFolder(bookmarkFolder.children as IBookmarkFolder[], id);
      if (found) return found;
    }
  }
  return undefined;
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    setBookmarks: (state, { payload }: { payload: IBookmarkFolder }) => {
      state.bookmarks = payload;
      state.breadcrumbs = [{ ...initialBookmark, id: state.bookmarks.id }];
    },
    addBreadcrumbNode: (state, { payload }: { payload: IBreadcrumbNode }) => {
      state.breadcrumbs.push(payload);
    },
    removeBreadcrumbNode: (state, { payload }: { payload: string }) => {
      const index = state.breadcrumbs.findIndex((node) => node.id === payload);
      if (index > -1) {
        state.breadcrumbs = state.breadcrumbs.slice(0, index + 1);
      }
    },
    addBookmark: (state, { payload }: { payload: IBookmark }) => {
      if (state.breadcrumbs.length > 0) {
        const folder = findFolder(
          state.bookmarks.children,
          state.breadcrumbs[state.breadcrumbs.length - 1].id,
        );
        if (folder) {
          (folder.children as IBookmarkItem[]).push(payload);
        }
      } else {
        state.bookmarks.children.push(payload);
      }
    },
    addFolder: (state, { payload }: { payload: IBookmarkFolder }) => {
      if (state.breadcrumbs.length > 0) {
        const folder = findFolder(
          state.bookmarks.children,
          state.breadcrumbs[state.breadcrumbs.length - 1].id,
        );
        if (folder) {
          (folder.children as IBookmarkItem[]).push(payload);
        }
      } else {
        state.bookmarks.children.push(payload);
      }
    },
    removeBookmark: (state, { payload }: { payload: IBookmark }) => {
      if (state.breadcrumbs.length > 0) {
        const folder = findFolder(
          state.bookmarks.children,
          state.breadcrumbs[state.breadcrumbs.length - 1].id,
        );
        if (folder) {
          const bookmarkFolder = folder as IBookmarkFolder;
          bookmarkFolder.children = bookmarkFolder.children.filter(
            (item) => item.id !== payload.id,
          );
        }
      } else {
        state.bookmarks.children = state.bookmarks.children.filter(
          (bookmark) => bookmark.id !== payload.id,
        );
      }
    },
    removeFolder: (state, { payload }: { payload: IBookmarkFolder }) => {
      if (state.breadcrumbs.length > 0) {
        const folder = findFolder(
          state.bookmarks.children,
          state.breadcrumbs[state.breadcrumbs.length - 1].id,
        );
        if (folder) {
          const bookmarkFolder = folder as IBookmarkFolder;
          bookmarkFolder.children = bookmarkFolder.children.filter(
            (item) => item.id !== payload.id,
          );
        }
      } else {
        state.bookmarks.children = state.bookmarks.children.filter(
          (folder) => folder.id !== payload.id,
        );
      }
    },
  },
});

export const {
  addBookmark,
  addFolder,
  removeBookmark,
  removeFolder,
  setBookmarks,
  addBreadcrumbNode,
  removeBreadcrumbNode,
} = bookmarkSlice.actions;

export const bookmarkState = (state: { bookmark: State }) => state.bookmark;

export const selectCurrentFolder = createSelector([bookmarkState], (state) => {
  const { bookmarks, breadcrumbs } = state;
  if (breadcrumbs.length === 0) return bookmarks.children;

  const currentFolderId = breadcrumbs[breadcrumbs.length - 1].id;
  const folder = findFolder([bookmarks], currentFolderId);

  return folder?.children ?? [];
});

export default bookmarkSlice.reducer;
