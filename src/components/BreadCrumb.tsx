import type { FC } from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '@store';
import { bookmarkState, removeBreadcrumbNode } from '@store/slices/bookmark';
import type { IBreadcrumbNode } from '@ts/bookmark';
import { truncateText } from '@utils';

interface NodeProps extends IBreadcrumbNode {
  index: number;
  isLast: boolean;
}

const Node: FC<NodeProps> = ({ id, title, isLast }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <p
        className={`text-white/90 hover:underline cursor-pointer text-md ${
          isLast ? 'font-medium pointer-events-none' : ''
        }`}
        role="button"
        onClick={() => dispatch(removeBreadcrumbNode(id))}
      >
        {truncateText(title)}
      </p>
      {!isLast && <MdOutlineNavigateNext className="text-white/90 text-md mx-1" />}
    </>
  );
};

const BreadCrumb = () => {
  const { breadcrumbs } = useAppSelector(bookmarkState);

  return (
    <div className="flex flex-row w-full items-center justify-center">
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
