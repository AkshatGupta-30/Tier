import { useEffect, type FC } from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

import { BREADCRUMBS } from '@constants/breadcrumb';
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
        className={`text-white/90 hover:underline cursor-pointer text-lg ${
          isLast ? 'font-medium pointer-events-none' : ''
        }`}
        role="button"
        onClick={() => removeBreadcrumb(id)}
      >
        {truncateText(title)}
      </p>
      {!isLast && <MdOutlineNavigateNext className="text-white/90 text-md mx-1" />}
    </>
  );
};

const BreadCrumb = () => {
  const { breadcrumbs, createNewBreadcrumb } = useBookmarks();

  const location = useLocation();

  useEffect(() => {
    createNewBreadcrumb(BREADCRUMBS[location.pathname]);
  }, [location.pathname]);

  return (
    <div className="flex flex-row w-full items-center justify-start pl-6">
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
