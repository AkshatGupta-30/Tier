import useTheme from '@hooks/useTheme';
import type { BackgroundOption } from '@ts/theme';

interface BackgroundCardsProps {
  background: BackgroundOption;
  isSelected: boolean;
  index: number;
}

const BackgroundColorCards = ({ isSelected, background, index }: BackgroundCardsProps) => {
  const { label, classes } = background || {};
  const { switchBackgroundOption } = useTheme();

  return (
    <button
      className={`group relative flex h-24 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 transition-all duration-300 ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-500/20 dark:border-blue-400 dark:ring-blue-400/20'
          : 'border-transparent hover:border-black/10 dark:hover:border-white/10'
      } ${classes}`}
      onClick={() => switchBackgroundOption(index)}
    >
      <span className="z-10 text-lg font-bold text-black/80 transition-transform duration-300 group-hover:scale-110 dark:text-white/80">
        {label}
      </span>
    </button>
  );
};

const CustomBackground = () => {
  const { backgroundOptionIndex, BACKGROUND_OPTIONS } = useTheme();

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
      {BACKGROUND_OPTIONS?.map((background, index) => (
        <BackgroundColorCards
          key={background.id || index}
          background={background}
          isSelected={index === backgroundOptionIndex}
          index={index}
        />
      ))}
    </div>
  );
};

export default CustomBackground;
