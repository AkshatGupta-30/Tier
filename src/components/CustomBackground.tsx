import { List } from 'react-window';

import useTheme from '@hooks/useTheme';
import type { BackgroundOption } from '@ts/theme';

interface BackgroundCardsProps {
  background: BackgroundOption;
  isSelected: boolean;
  index: number;
}

const BackgroundCards = ({ isSelected, background, index }: BackgroundCardsProps) => {
  const { label, classes } = background || {};
  const { switchBackgroundOption } = useTheme();

  return (
    <div
      className={`relative flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 border-2 rounded-lg p-1 ${
        isSelected ? 'border-black dark:border-white' : 'border-transparent'
      }`}
    >
      <button
        className={`group-hover:cursor-pointer w-50 h-30 flex items-center justify-center rounded-lg ${classes}`}
        onClick={() => switchBackgroundOption(index)}
      >
        <p className={'text-center text-xl font-extrabold text-black dark:text-white'}>{label}</p>
      </button>
    </div>
  );
};

const CustomBackground = () => {
  const { backgroundOptionIndex, BACKGROUND_OPTIONS } = useTheme();

  return (
    <List
      className="flex flex-row justify-start gap-2 scrollbar-hidden px-10"
      rowCount={BACKGROUND_OPTIONS?.length || 0}
      rowHeight={6}
      rowProps={{ backgrounds: BACKGROUND_OPTIONS }}
      rowComponent={({ index, backgrounds }) => {
        const background = backgrounds?.[index] || {};
        const { id } = background || {};
        return (
          <BackgroundCards
            key={id}
            background={background}
            isSelected={index === backgroundOptionIndex}
            index={index}
          />
        );
      }}
    />
  );
};

export default CustomBackground;
