import { Activity, useEffect, useMemo, useRef, useState } from 'react';

import { LABELS } from '@constants/label';
import { MODAL_TYPES } from '@constants/modals';
import { hideScrollbar } from '@constants/style';
import useBookmarkContextMenu from '@hooks/useBookmarkContextMenu';
import { ContextMenuPositionEnum, type ContextMenuItemType } from '@ts/bookmark';

import Modal from './modals';

const { OPEN_BOOKMARK, RENAME, CUT, COPY, PASTE, DELETE, NEW_BOOKMARK, NEW_FOLDER } = LABELS;

const BookmarkMenu = () => {
  const {
    visible,
    coordinates,
    bookmark,
    isEmptySpace,
    hideContextMenu,
    openBookmark,
    cutBookmark,
    copyBookmark,
    pasteBookmark,
    deleteBookmark,
  } = useBookmarkContextMenu();

  const [position, setPosition] = useState<ContextMenuPositionEnum>(
    ContextMenuPositionEnum.TOP_LEFT,
  );
  const [maxHeight, setMaxHeight] = useState<number>();

  const ref = useRef<HTMLDivElement>(null);

  const isFolder = bookmark && Object.hasOwn(bookmark, 'children');

  const EMPTY_SPACE_CONTEXT_MENU_ITEMS: ContextMenuItemType[] = [
    {
      label: NEW_BOOKMARK,
      onClick: () => {
        console.log('Bookmark: ', bookmark);
        Modal.open({
          openModalType: MODAL_TYPES.CREATE_BOOKMARK,
          childrenProps: { parentId: bookmark!.id! },
        });
      },
    },
    {
      label: NEW_FOLDER,
      onClick: () => {
        console.log('Bookmark: ', bookmark);
        Modal.open({
          openModalType: MODAL_TYPES.CREATE_BOOKMARK,
          childrenProps: { parentId: bookmark!.id!, createFolder: true },
        });
      },
    },
  ];

  const BOOKMARK_CONTEXT_MENU_ITEMS: ContextMenuItemType[] = [
    {
      label: OPEN_BOOKMARK,
      onClick: () => openBookmark(),
    },
    { type: 'separator' },
    {
      label: RENAME,
      onClick: () => {
        Modal.open({
          openModalType: MODAL_TYPES.CREATE_BOOKMARK,
          childrenProps: { parentId: bookmark!.parentId!, bookmark: bookmark! },
        });
      },
    },
    { type: 'separator' },
    {
      label: CUT,
      onClick: cutBookmark,
    },
    {
      label: COPY,
      onClick: copyBookmark,
    },
    {
      label: PASTE,
      className: !bookmark ? 'opacity-50' : '',
      disabled: !bookmark,
      onClick: () => {
        if (bookmark) pasteBookmark(bookmark.parentId!);
      },
    },
    { type: 'separator' },
    {
      label: DELETE,
      onClick: deleteBookmark,
    },
    ...(isFolder
      ? ([
          { type: 'separator' },
          {
            label: NEW_BOOKMARK,
            onClick: () => {
              console.log('Bookmark: ', bookmark);
              Modal.open({
                openModalType: MODAL_TYPES.CREATE_BOOKMARK,
                childrenProps: { parentId: bookmark!.parentId! },
              });
            },
          },
          {
            label: NEW_FOLDER,
            onClick: () => {
              console.log('Bookmark: ', bookmark);
              Modal.open({
                openModalType: MODAL_TYPES.CREATE_BOOKMARK,
                childrenProps: { parentId: bookmark!.id!, createFolder: true },
              });
            },
          },
        ] as ContextMenuItemType[])
      : []),
  ];

  const MENU_ITEMS = isEmptySpace ? EMPTY_SPACE_CONTEXT_MENU_ITEMS : BOOKMARK_CONTEXT_MENU_ITEMS;

  const [translateX, translateY] = useMemo(() => {
    switch (position) {
      case ContextMenuPositionEnum.TOP_LEFT:
        return [0, 0];
      case ContextMenuPositionEnum.TOP_RIGHT:
        return ['-100%', 0];
      case ContextMenuPositionEnum.BOTTOM_LEFT:
        return [0, '-100%'];
      case ContextMenuPositionEnum.BOTTOM_RIGHT:
        return ['-100%', '-100%'];
    }
  }, [position]);

  const handleClose = () => {
    hideContextMenu();
    setPosition(ContextMenuPositionEnum.TOP_LEFT);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) handleClose();
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || !ref.current) return;

    const { x, y } = coordinates;
    const { offsetWidth, offsetHeight } = ref.current;
    const { innerWidth, innerHeight } = window;

    const spaceBelow = innerHeight - y;
    const spaceAbove = y;
    const spaceRight = innerWidth - x;
    const spaceLeft = x;

    const useBottom = offsetHeight > spaceBelow && spaceAbove > spaceBelow;
    const useRight = offsetWidth > spaceRight && spaceLeft > spaceRight;

    if (useBottom && useRight) {
      setPosition(ContextMenuPositionEnum.BOTTOM_RIGHT);
    } else if (useBottom) {
      setPosition(ContextMenuPositionEnum.BOTTOM_LEFT);
    } else if (useRight) {
      setPosition(ContextMenuPositionEnum.TOP_RIGHT);
    } else {
      setPosition(ContextMenuPositionEnum.TOP_LEFT);
    }

    const PADDING = 10;
    const calculatedMaxHeight = useBottom ? spaceAbove - PADDING : spaceBelow - PADDING;
    setMaxHeight(calculatedMaxHeight);
  }, [coordinates, visible]);

  return (
    <Activity mode={visible ? 'visible' : 'hidden'}>
      <div
        ref={ref}
        className={`fixed p-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg min-w-48 overflow-scroll ${hideScrollbar}`}
        style={{
          top: coordinates.y,
          left: coordinates.x,
          transform: `translateX(${translateX}) translateY(${translateY})`,
          maxHeight,
        }}
      >
        {MENU_ITEMS.map(({ label, onClick, className, disabled, type }, index) => {
          if (type === 'separator') {
            return (
              <div
                key={index}
                className="h-px w-full my-1 bg-black/10 dark:bg-white/10"
              />
            );
          }

          return (
            <button
              key={index}
              onClick={() => {
                onClick?.();
                handleClose();
              }}
              className={`w-full p-2 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer text-left text-md rounded-sm ${className}`}
              disabled={disabled}
            >
              {label}
            </button>
          );
        })}
      </div>
    </Activity>
  );
};

export default BookmarkMenu;
