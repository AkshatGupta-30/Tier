import { List } from 'react-window';

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
    <div
      className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-1 transition-all duration-300 ${
        isSelected ? 'border-black dark:border-white' : 'border-transparent'
      }`}
    >
      <button
        className={`flex h-30 w-50 items-center justify-center rounded-lg group-hover:cursor-pointer ${classes}`}
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
      className="scrollbar-hidden mt-3 flex flex-row justify-start gap-2 px-10"
      rowCount={BACKGROUND_OPTIONS?.length || 0}
      rowHeight={6}
      rowProps={{ backgrounds: BACKGROUND_OPTIONS }}
      rowComponent={({ index, backgrounds }) => {
        const background = backgrounds?.[index] || {};
        const { id } = background || {};

        return (
          <BackgroundColorCards
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
