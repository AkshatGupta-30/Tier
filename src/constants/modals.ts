import CreateBookmarkModal from '@components/modals/CreateBookmarkModal';
import type { ModalPropsMap } from '@ts/modal';

export const MODAL_TYPES = {
  CREATE_BOOKMARK: 'CREATE_BOOKMARK',
} as const;

export type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];

export const MODAL_COMPONENTS: {
  [key in keyof typeof MODAL_TYPES]: React.FC<ModalPropsMap[key]>;
} = {
  CREATE_BOOKMARK: CreateBookmarkModal,
} as const;
