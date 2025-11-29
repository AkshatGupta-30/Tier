import { Activity, useState, type FormEvent } from 'react';
import { IoMdClose } from 'react-icons/io';

import { LABELS } from '@constants/label';
import useBookmarks from '@hooks/useBookmarks';
import type { CreateBookmarkModalProps } from '@ts/modal';

import Modal from '.';

const {
  CREATE,
  UPDATE,
  CREATE_BOOKMARK,
  CREATE_FOLDER,
  UPDATE_BOOKMARK,
  UPDATE_FOLDER,
  CANCEL,
  FOLDER,
  BOOKMARK,
} = LABELS;

const CreateBookmarkModal = ({ bookmark, parentId, createFolder }: CreateBookmarkModalProps) => {
  const {
    id: bookmarkId,
    title: bookmarkTitle = '',
    url: bookmarkUrl = '',
    children: bookmarkChildren,
  } = bookmark || {};

  const { addBookmark, addFolder, updateBookmark, updateFolder } = useBookmarks();

  const [type, setType] = useState<'bookmark' | 'folder'>(() =>
    createFolder ? 'folder' : 'bookmark',
  );
  const [title, setTitle] = useState(bookmarkTitle || '');
  const [url, setUrl] = useState(bookmarkUrl || '');

  const isUpdating = !!bookmarkId;
  const isFolderType = type === 'folder' || !!bookmarkChildren;

  const ctaDisabled = () => {
    if (bookmark) {
      return isFolderType
        ? title === bookmarkTitle
        : title === bookmarkTitle && url === bookmarkUrl;
    }

    return isFolderType ? !title : !title || !url;
  };

  const modalTitle = () => {
    if (isFolderType) return isUpdating ? UPDATE_FOLDER : CREATE_FOLDER;
    return isUpdating ? UPDATE_BOOKMARK : CREATE_BOOKMARK;
  };

  const handleCreateBookmark = (e: FormEvent) => {
    e.preventDefault();

    if (isFolderType) {
      if (isUpdating) {
        updateFolder({ parentId, title, id: bookmarkId });
      } else {
        addFolder({ parentId, title });
      }
    } else {
      if (isUpdating) {
        updateBookmark({ parentId, title, url, id: bookmarkId });
      } else {
        addBookmark({ parentId, title, url });
      }
    }

    resetForm(e);
  };

  const resetForm = (e: FormEvent) => {
    e.preventDefault();

    Modal.close();
    setTitle('');
    setUrl('');
    setType('bookmark');
  };

  return (
    <section className="max-w-[90%] max-h-[90%] bg-gray-200 dark:bg-gray-800 rounded-lg flex flex-col justify-start overflow-hidden border border-gray-300 dark:border-gray-700">
      <header className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 px-6 py-4">
        <p className="text-xl font-semibold text-black dark:text-white">{modalTitle()}</p>
        <IoMdClose
          role="button"
          className="text-black dark:text-white text-xl cursor-pointer"
          onClick={resetForm}
        />
      </header>
      <form
        className="flex flex-col gap-5 p-6 pt-8 w-[500px]"
        onSubmit={handleCreateBookmark}
        onReset={resetForm}
      >
        <Activity mode={isUpdating ? 'hidden' : 'visible'}>
          <div className="w-full flex items-center border border-gray-700 rounded-lg overflow-hidden">
            <p
              className={`w-full text-sm font-medium text-center p-2 transition-colors ${
                type === 'bookmark'
                  ? 'bg-gray-300 text-black dark:bg-gray-700 dark:text-white'
                  : 'text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-300/25 hover:dark:bg-gray-700/25 hover:text-black hover:dark:text-white'
              }`}
              onClick={() => setType('bookmark')}
            >
              {BOOKMARK}
            </p>
            <p
              className={`w-full text-sm font-medium text-center p-2 transition-colors ${
                type === 'folder'
                  ? 'bg-gray-300 text-black dark:bg-gray-700 dark:text-white'
                  : 'text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-300/25 hover:dark:bg-gray-700/25 hover:text-black hover:dark:text-white'
              }`}
              onClick={() => setType('folder')}
            >
              {FOLDER}
            </p>
          </div>
        </Activity>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white text-sm placeholder:text-gray-600 placeholder:dark:text-gray-400 outline-none focus:ring focus:ring-gray-400 focus:dark:ring-gray-600"
        />
        {!isFolderType && (
          <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white text-sm placeholder:text-gray-600 placeholder:dark:text-gray-400 outline-none focus:ring focus:ring-gray-400 focus:dark:ring-gray-600"
          />
        )}
        <div className="flex items-center justify-end pt-3 gap-5">
          <button
            type="reset"
            className="px-5 py-2 bg-gray-300 dark:bg-gray-700 text-black/80 dark:text-white/80 rounded-full text-base font-normal cursor-pointer"
          >
            {CANCEL}
          </button>
          <button
            disabled={ctaDisabled()}
            type="submit"
            className="px-5 py-2 bg-indigo-300 disabled:bg-indigo-300/60 text-black disabled:text-black/50 dark:bg-indigo-700 disabled:dark:bg-indigo-700/60 dark:text-white disabled:dark:text-white/50 rounded-full text-base font-medium disabled:cursor-default cursor-pointer"
          >
            {isUpdating ? UPDATE : CREATE}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateBookmarkModal;
