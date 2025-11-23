import { useAppSelector, useAppDispatch } from '@store';
import {
  addBreadcrumbNode,
  bookmarkState,
  removeBreadcrumbNode,
  selectCurrentFolder,
  setBookmarks,
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
    chrome.bookmarks.create({ title, url, parentId });
  };

  const removeBookmark = async (id: string) => {
    chrome.bookmarks.remove(id);
  };

  const updateBookmark = async ({ id, title, url }: IBookmark) => {
    chrome.bookmarks.update(id, { title, url });
  };

  const addBreadcrumb = async (bookmark: IBreadcrumbNode) => dispatch(addBreadcrumbNode(bookmark));
  const removeBreadcrumb = async (id: string) => dispatch(removeBreadcrumbNode(id));

  return {
    bookmarks,
    breadcrumbs,
    fetchBookmarks,
    addBookmark,
    removeBookmark,
    updateBookmark,
    addBreadcrumb,
    removeBreadcrumb,
  };
};

export default useBookmarks;
