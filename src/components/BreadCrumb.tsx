import { type FC } from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';

import useBookmarks from '@hooks/useBookmarks';
import type { IBreadcrumbNode } from '@ts/bookmark';
import { truncateText } from '@utils';

interface NodeProps extends IBreadcrumbNode {
  index: number;
  isLast: boolean;
}

const Node: FC<NodeProps> = ({ id, title, isLast }) => {
  const { removeBreadcrumb } = useBookmarks();

  return (
    <>
      <p
        className={`cursor-pointer text-lg text-black/90 hover:underline dark:text-white/90 ${
          isLast ? 'pointer-events-none font-medium' : ''
        }`}
        role="button"
        onClick={() => removeBreadcrumb(id)}
      >
        {truncateText(title)}
      </p>
      {!isLast && (
        <MdOutlineNavigateNext className="text-md mx-1 text-black/90 dark:text-white/90" />
      )}
    </>
  );
};

const BreadCrumb = () => {
  const { breadcrumbs } = useBookmarks();

  return (
    <div className="flex w-full flex-row items-center justify-start pl-6">
      {breadcrumbs.map((node, index) => (
        <Node
          key={node.id}
          {...node}
          index={index}
          isLast={index === breadcrumbs.length - 1}
        />
      ))}
    </div>
  );
};

export default BreadCrumb;
