import useTheme from '@hooks/useTheme';
import type { BackgroundOption } from '@ts/theme';

interface BackgroundCardsProps {
  background: BackgroundOption;
  isSelected: boolean;
  index: number;
}

const BackgroundColorCards = ({ isSelected, background, index }: BackgroundCardsProps) => {
  const {  classes } = background || {};
  const { switchBackgroundOption } = useTheme();

  return (
    <button
      className={`relative flex h-16 w-16 cursor-pointer flex-col items-center justify-center  rounded-full border-2 transition-all duration-300 ${
        isSelected
          ? 'border-blue-500 dark:border-blue-400'
          : 'border-transparent'
      } ${classes}`}
      onClick={() => switchBackgroundOption(index)}
    />
  );
};

const CustomBackground = () => {
  const { backgroundOptionIndex, BACKGROUND_OPTIONS } = useTheme();

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
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
