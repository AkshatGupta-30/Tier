import { useAppSelector, useAppDispatch } from '@store';
import {
  addBreadcrumbNode,
  bookmarkState,
  removeBreadcrumbNode,
  selectCurrentFolder,
  setBookmarks,
  addBookmark as appendBookmark,
  removeBookmark as deleteBookmark,
  updateBookmark as editBookmark,
  addFolder as appendFolder,
  removeFolder as deleteFolder,
  updateFolder as editFolder,
  createFreshBreadcrumb,
  clearBreadcrumb,
  setSearchBookmarks,
} from '@store/slices/bookmark';
import type { IBookmark, IBookmarkFolder, IBreadcrumbNode } from '@ts/bookmark';

const useBookmarks = () => {
  const dispatch = useAppDispatch();
  const { children } = useAppSelector(selectCurrentFolder) || {};
  const { breadcrumbs, searchBookmarks: bookmarkSearches } = useAppSelector(bookmarkState);

  const bookmarks = bookmarkSearches || children || [];

  const fetchBookmarks = async () => {
    const bookmarks = await chrome.bookmarks.getTree();
    const [bookmarkManager] = bookmarks[0].children || [];
    dispatch(setBookmarks(bookmarkManager as IBookmarkFolder));
  };

  const addBookmark = async ({ parentId, title, url }: Omit<IBookmark, 'id'>) => {
    const bookmark = await chrome.bookmarks.create({ title, url, parentId });
    dispatch(appendBookmark(bookmark as IBookmark));
  };

  const removeBookmark = (id: string) => {
    chrome.bookmarks.remove(id);
    dispatch(deleteBookmark(id));
  };

  const updateBookmark = ({ id, title, url }: IBookmark) => {
    dispatch(editBookmark({ id, title, url }));
    chrome.bookmarks.update(id, { title, url });
  };

  const searchBookmarks = (query: string) => {
    chrome.bookmarks.search({ query }).then((bookmarks) => {
      console.log({ bookmarks });
      dispatch(setSearchBookmarks(bookmarks));
    });
  };

  const addFolder = async ({ parentId, title }: Omit<IBookmarkFolder, 'id' | 'children'>) => {
    const folder = await chrome.bookmarks.create({ title, parentId });
    dispatch(appendFolder(folder as IBookmarkFolder));
  };

  const removeFolder = (id: string) => {
    chrome.bookmarks.remove(id);
    dispatch(deleteFolder(id));
  };

  const updateFolder = ({ id, title }: Omit<IBookmarkFolder, 'children'>) => {
    dispatch(editFolder({ id, title }));
    chrome.bookmarks.update(id, { title });
  };

  const createNewBreadcrumb = (bookmark: IBreadcrumbNode) =>
    dispatch(createFreshBreadcrumb(bookmark));

  const addBreadcrumb = (bookmark: IBreadcrumbNode) => dispatch(addBreadcrumbNode(bookmark));

  const removeBreadcrumb = (id: string) => dispatch(removeBreadcrumbNode(id));

  const clearAllBreadcrumb = () => dispatch(clearBreadcrumb());

  return {
    bookmarks,
    breadcrumbs,
    bookmarkSearches,
    fetchBookmarks,
    addBookmark,
    removeBookmark,
    updateBookmark,
    searchBookmarks,
    addFolder,
    removeFolder,
    updateFolder,
    createNewBreadcrumb,
    addBreadcrumb,
    removeBreadcrumb,
    clearAllBreadcrumb,
  };
};

export default useBookmarks;
