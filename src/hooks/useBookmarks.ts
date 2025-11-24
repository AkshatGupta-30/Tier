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
} from '@store/slices/bookmark';
import type { IBookmark, IBookmarkFolder, IBreadcrumbNode } from '@ts/bookmark';

const useBookmarks = () => {
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector(selectCurrentFolder);
  const { breadcrumbs } = useAppSelector(bookmarkState);

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

  const addFolder = async ({ parentId, title }: Omit<IBookmarkFolder, 'id'>) => {
    const folder = await chrome.bookmarks.create({ title, parentId });
    dispatch(appendFolder(folder as IBookmarkFolder));
  };

  const removeFolder = (id: string) => {
    chrome.bookmarks.remove(id);
    dispatch(deleteFolder(id));
  };

  const updateFolder = ({ id, title }: { id: string; title: string }) => {
    dispatch(editFolder({ id, title }));
    chrome.bookmarks.update(id, { title });
  };

  const addBreadcrumb = (bookmark: IBreadcrumbNode) => dispatch(addBreadcrumbNode(bookmark));

  const removeBreadcrumb = (id: string) => dispatch(removeBreadcrumbNode(id));

  return {
    bookmarks,
    breadcrumbs,
    fetchBookmarks,
    addBookmark,
    removeBookmark,
    updateBookmark,
    addFolder,
    removeFolder,
    updateFolder,
    addBreadcrumb,
    removeBreadcrumb,
  };
};

export default useBookmarks;
