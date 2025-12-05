import type { ReactElement } from 'react';

interface NavItemProps {
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ label, icon: Icon, isActive, onClick }: NavItemProps): ReactElement => (
  <button
    onClick={onClick}
    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400'
        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5'
    }`}
  >
    <Icon className="text-lg" />
    {label}
  </button>
);

export default NavItem;
