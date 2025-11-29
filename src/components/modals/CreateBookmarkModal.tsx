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
    <section className="flex max-h-[90%] max-w-[90%] flex-col justify-start overflow-hidden rounded-lg border border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
      <header className="flex items-center justify-between bg-gray-100 px-6 py-4 dark:bg-gray-900">
        <p className="text-xl font-semibold text-black dark:text-white">{modalTitle()}</p>
        <IoMdClose
          role="button"
          className="cursor-pointer text-xl text-black dark:text-white"
          onClick={resetForm}
        />
      </header>
      <form
        className="flex w-[500px] flex-col gap-5 p-6 pt-8"
        onSubmit={handleCreateBookmark}
        onReset={resetForm}
      >
        <Activity mode={isUpdating ? 'hidden' : 'visible'}>
          <div className="flex w-full items-center overflow-hidden rounded-lg border border-gray-700">
            <p
              className={`w-full p-2 text-center text-sm font-medium transition-colors ${
                type === 'bookmark'
                  ? 'bg-gray-300 text-black dark:bg-gray-700 dark:text-white'
                  : 'cursor-pointer text-gray-700 hover:bg-gray-300/25 hover:text-black dark:text-gray-300 hover:dark:bg-gray-700/25 hover:dark:text-white'
              }`}
              onClick={() => setType('bookmark')}
            >
              {BOOKMARK}
            </p>
            <p
              className={`w-full p-2 text-center text-sm font-medium transition-colors ${
                type === 'folder'
                  ? 'bg-gray-300 text-black dark:bg-gray-700 dark:text-white'
                  : 'cursor-pointer text-gray-700 hover:bg-gray-300/25 hover:text-black dark:text-gray-300 hover:dark:bg-gray-700/25 hover:dark:text-white'
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
          className="w-full rounded-lg border border-gray-300 p-2 text-sm text-black outline-none placeholder:text-gray-600 focus:ring focus:ring-gray-400 dark:border-gray-700 dark:text-white placeholder:dark:text-gray-400 focus:dark:ring-gray-600"
        />
        {!isFolderType && (
          <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 p-2 text-sm text-black outline-none placeholder:text-gray-600 focus:ring focus:ring-gray-400 dark:border-gray-700 dark:text-white placeholder:dark:text-gray-400 focus:dark:ring-gray-600"
          />
        )}
        <div className="flex items-center justify-end gap-5 pt-3">
          <button
            type="reset"
            className="cursor-pointer rounded-full bg-gray-300 px-5 py-2 text-base font-normal text-black/80 dark:bg-gray-700 dark:text-white/80"
          >
            {CANCEL}
          </button>
          <button
            disabled={ctaDisabled()}
            type="submit"
            className="cursor-pointer rounded-full bg-indigo-300 px-5 py-2 text-base font-medium text-black disabled:cursor-default disabled:bg-indigo-300/60 disabled:text-black/50 dark:bg-indigo-700 dark:text-white disabled:dark:bg-indigo-700/60 disabled:dark:text-white/50"
          >
            {isUpdating ? UPDATE : CREATE}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateBookmarkModal;
