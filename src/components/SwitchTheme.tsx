import { FaCheck } from 'react-icons/fa';

import { ThemeModeEnum } from '@ts/theme';
import useTheme from '@hooks/useTheme';

interface ThemeModeProps {
  isSelected: boolean;
  theme: ThemeModeEnum;
  onClick: () => void;
}

interface ThemeMode {
  background: string;
  label: string;
  color: string;
}

const THEMES: Record<ThemeModeEnum, ThemeMode> = {
  [ThemeModeEnum.LIGHT]: {
    background: 'bg-gradient-to-br from-white to-black/5',
    label: 'Light',
    color: 'text-black',
  },
  [ThemeModeEnum.DARK]: {
    background: 'bg-gradient-to-br from-black to-white/5',
    label: 'Dark',
    color: 'text-white',
  },
} as const;

const Checkbox = ({ isSelected }: { isSelected: boolean }) => {
  return (
    <div
      className={`flex items-center justify-center w-5 aspect-square absolute top-0 right-0 m-1.5 rounded-sm  ${
        isSelected ? 'bg-blue-600' : 'border-2 border-gray-600'
      }`}
    >
      {isSelected && <FaCheck className="text-white" />}
    </div>
  );
};

const ThemeMode = ({ isSelected, theme, onClick }: ThemeModeProps) => {
  const { background, label, color } = THEMES[theme];
  return (
    <div
      className="relative flex flex-col items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      <div className={`w-60 h-30 flex items-center justify-center rounded-lg ${background}`}>
        <p className={`text-center text-4xl font-extrabold ${color}`}>{label}</p>
      </div>
      <Checkbox isSelected={isSelected} />
    </div>
  );
};

const SwitchTheme = () => {
  const { isLightMode, switchTheme } = useTheme();

  return (
    <div className="flex flex-row items-center gap-5">
      <ThemeMode
        theme={ThemeModeEnum.LIGHT}
        isSelected={isLightMode}
        onClick={switchTheme}
      />
      <ThemeMode
        theme={ThemeModeEnum.DARK}
        isSelected={!isLightMode}
        onClick={switchTheme}
      />
    </div>
  );
};

export default SwitchTheme;
