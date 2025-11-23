import { useEffect } from 'react';

import NewTab from '@pages/newTab/NewTab';
import { useAppDispatch } from '@store';
import { setBookmarks } from '@store/slices/bookmark';
import type { IBookmarkFolder } from '@ts/bookmark';

const App = () => {
  const dispatch = useAppDispatch();

  const fetchBookmarks = async () => {
    const bookmarks = await chrome.bookmarks.getTree();
    const [bookmarkManager] = bookmarks[0].children || [];
    console.log({ bookmarkManager });
    dispatch(setBookmarks(bookmarkManager as IBookmarkFolder));
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return <NewTab />;
};

export default App;
