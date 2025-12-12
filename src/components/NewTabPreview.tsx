import { Activity } from 'react';

import NewTab from '@pages/NewTab';

interface NewTabPreviewProps {
  open?: boolean;
}

const NewTabPreview = ({ open: isOpen }: NewTabPreviewProps) => {
  return (
    <Activity mode={isOpen ? 'visible' : 'hidden'}>
      <div
        className={`relative z-1 flex h-full items-center justify-center overflow-hidden rounded-xl border border-black dark:border-white`}
      >
        <div
          className="h-full w-fit origin-top-left overflow-hidden"
          inert
        >
          <div className="origin-top-left">
            <NewTab />
          </div>
        </div>
      </div>
    </Activity>
  );
};

export default NewTabPreview;
