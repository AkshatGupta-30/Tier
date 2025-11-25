import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit';

import type { IBookmark, IBookmarkFolder, IBookmarkItem, IBreadcrumbNode } from '@ts/bookmark';

const initialBookmark: IBookmarkFolder = {
  id: '1',
  title: 'Bookmark Bar',
  children: [],
  parentId: '0',
};

interface State {
  breadcrumbs: IBreadcrumbNode[];
  bookmarks: IBookmarkFolder;
  contextMenu: {
    visible: boolean;
    coordinates: { x: number; y: number };
    bookmark?: IBookmarkItem;
  };
}

const initialState: State = {
  breadcrumbs: [initialBookmark],
  bookmarks: initialBookmark,
  contextMenu: {
    visible: false,
    coordinates: { x: 0, y: 0 },
  },
};

const findFolder = (items: IBookmarkItem[], id: string): IBookmarkFolder | undefined => {
  for (const item of items) {
    if (Object.hasOwn(item, 'children')) {
      const folder = item as IBookmarkFolder;
      if (folder?.id === id) return folder;
      const found = findFolder(folder.children as IBookmarkFolder[], id);
      if (found) return found;
    }
  }
  return undefined;
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    setBookmarks: (state, { payload }: PayloadAction<IBookmarkFolder>) => {
      state.bookmarks = payload;
      state.breadcrumbs = [{ ...initialBookmark, id: state.bookmarks.id }];
    },
    createFreshBreadcrumb: (state, { payload }: PayloadAction<IBreadcrumbNode>) => {
      state.breadcrumbs = [payload];
    },
    addBreadcrumbNode: (state, { payload }: PayloadAction<IBreadcrumbNode>) => {
      state.breadcrumbs.push(payload);
    },
    removeBreadcrumbNode: (state, { payload }: PayloadAction<string>) => {
      const index = state.breadcrumbs.findIndex((node) => node.id === payload);
      if (index > -1) {
        state.breadcrumbs = state.breadcrumbs.slice(0, index + 1);
      }
    },
    clearBreadcrumb: (state) => {
      state.breadcrumbs = [initialBookmark];
    },
    addBookmark: (state, { payload }: PayloadAction<IBookmark>) => {
      if (state.breadcrumbs.length > 1) {
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
    addFolder: (state, { payload }: PayloadAction<IBookmarkFolder>) => {
      const newFolder = { ...payload, children: [] };
      if (state.breadcrumbs.length > 1) {
        const folder = findFolder(
          state.bookmarks.children,
          state.breadcrumbs[state.breadcrumbs.length - 1].id,
        );
        if (folder) {
          (folder.children as IBookmarkItem[]).push(newFolder);
        }
      } else {
        state.bookmarks.children.push(newFolder);
      }
    },
    removeBookmark: (state, { payload }: PayloadAction<string>) => {
      if (state.breadcrumbs.length > 1) {
        const folder = findFolder(
          state.bookmarks.children,
          state.breadcrumbs[state.breadcrumbs.length - 1].id,
        );
        if (folder) {
          const bookmarkFolder = folder as IBookmarkFolder;
          bookmarkFolder.children = bookmarkFolder.children.filter(({ id }) => id !== payload);
        }
      } else {
        state.bookmarks.children = state.bookmarks.children.filter(({ id }) => id !== payload);
      }
    },
    removeFolder: (state, { payload }: PayloadAction<string>) => {
      if (state.breadcrumbs.length > 1) {
        const folder = findFolder(
          state.bookmarks.children,
          state.breadcrumbs[state.breadcrumbs.length - 1].id,
        );
        if (folder) {
          const bookmarkFolder = folder as IBookmarkFolder;
          bookmarkFolder.children = bookmarkFolder.children.filter(({ id }) => id !== payload);
        }
      } else {
        state.bookmarks.children = state.bookmarks.children.filter(({ id }) => id !== payload);
      }
    },
    updateBookmark: (
      state,
      { payload }: PayloadAction<{ id: string; title: string; url: string }>,
    ) => {
      if (state.breadcrumbs.length > 1) {
        const folder = findFolder(
          state.bookmarks.children,
          state.breadcrumbs[state.breadcrumbs.length - 1].id,
        );
        if (folder) {
          const bookmark = folder.children.find((item) => item.id === payload.id);
          if (bookmark) {
            bookmark.title = payload.title;
            (bookmark as IBookmark).url = payload.url;
          }
        }
      } else {
        const bookmark = state.bookmarks.children.find((item) => item.id === payload.id);
        if (bookmark) {
          bookmark.title = payload.title;
          (bookmark as IBookmark).url = payload.url;
        }
      }
    },
    updateFolder: (state, { payload }: PayloadAction<{ id: string; title: string }>) => {
      if (state.breadcrumbs.length > 1) {
        const folder = findFolder(
          state.bookmarks.children,
          state.breadcrumbs[state.breadcrumbs.length - 1].id,
        );
        if (folder) {
          const childFolder = folder.children.find((item) => item.id === payload.id);
          if (childFolder) {
            childFolder.title = payload.title;
          }
        }
      } else {
        const childFolder = state.bookmarks.children.find((item) => item.id === payload.id);
        if (childFolder) {
          childFolder.title = payload.title;
        }
      }
    },
    showContextMenu: (
      state,
      {
        payload,
      }: PayloadAction<{ coordinates: { x: number; y: number }; bookmark: IBookmarkItem }>,
    ) => {
      state.contextMenu = { ...payload, visible: true };
    },
    hideContextMenu: (state) => {
      state.contextMenu = initialState.contextMenu;
    },
  },
});

export const {
  addBookmark,
  addFolder,
  removeBookmark,
  removeFolder,
  updateBookmark,
  updateFolder,
  setBookmarks,
  createFreshBreadcrumb,
  clearBreadcrumb,
  addBreadcrumbNode,
  removeBreadcrumbNode,
  showContextMenu,
  hideContextMenu,
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
