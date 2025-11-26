import { FaCheck } from 'react-icons/fa';

import { COLORS } from '@constants/colors';
import useTheme from '@hooks/useTheme';

const AccentColorSelection = () => {
  const { accentColorIndex, colorList, changeAccentColor } = useTheme();

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] gap-x-2 gap-y-2">
      {colorList.map((color, index) => {
        const isSelected = accentColorIndex === index;
        return (
          <div
            key={color}
            className={`w-15 aspect-square rounded-full cursor-pointer transition-all flex items-center justify-center border-2 p-1`}
            style={{
              borderColor: isSelected ? COLORS.BLACK : COLORS.TRANSPARENT,
              backgroundColor: color,
            }}
            onClick={() => changeAccentColor(index)}
          >
            {isSelected && <FaCheck className="text-lg text-black" />}
          </div>
        );
      })}
    </div>
  );
};

export default AccentColorSelection;
