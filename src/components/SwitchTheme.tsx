import useTheme from '@hooks/useTheme';
import { ThemeModeEnum } from '@ts/theme';

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

const ThemeMode = ({ isSelected, theme, onClick }: ThemeModeProps) => {
  const { background, label, color } = THEMES[theme];
  return (
    <div
      className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-1 transition-all duration-300 ${
        isSelected ? 'border-black dark:border-white' : 'border-transparent'
      }`}
      onClick={onClick}
    >
      <div className={`flex h-30 w-60 items-center justify-center rounded-lg ${background}`}>
        <p className={`text-center text-4xl font-extrabold ${color}`}>{label}</p>
      </div>
    </div>
  );
};

const SwitchTheme = () => {
  const { isLightMode, switchTheme } = useTheme();

  return (
    <div className="mt-3 flex flex-row items-center gap-5 px-10">
      <ThemeMode
        theme={ThemeModeEnum.LIGHT}
        isSelected={isLightMode}
        onClick={() => switchTheme(ThemeModeEnum.LIGHT)}
      />
      <ThemeMode
        theme={ThemeModeEnum.DARK}
        isSelected={!isLightMode}
        onClick={() => switchTheme(ThemeModeEnum.DARK)}
      />
    </div>
  );
};

export default SwitchTheme;
