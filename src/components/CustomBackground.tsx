import { List } from 'react-window';

import useTheme from '@hooks/useTheme';
import type { BackgroundOption } from '@ts/theme';

interface BackgroundCardsProps {
  background: BackgroundOption;
  isSelected: boolean;
}

const BackgroundCards = ({ isSelected, background }: BackgroundCardsProps) => {
  const { label, classes } = background || {};
  const { switchBackgroundOption, isLightMode } = useTheme();

  return (
    <div
      className={`relative flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 border-2 rounded-lg p-1 ${
        isSelected ? 'border-white' : 'border-transparent'
      }`}
    >
      <button
        className={`w-50 h-30 flex items-center justify-center rounded-lg ${classes}`}
        onClick={() => switchBackgroundOption(background)}
      >
        <p
          className={`text-center text-xl font-extrabold ${
            isLightMode ? 'text-black' : 'text-white'
          }`}
        >
          {label}
        </p>
      </button>
    </div>
  );
};

const CustomBackground = () => {
  const { BACKGROUND_OPTIONS, backgroundOption } = useTheme();

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
            isSelected={id === backgroundOption?.id}
          />
        );
      }}
    />
  );
};

export default CustomBackground;
