import { useDispatch } from 'react-redux';

import { useAppSelector } from '@store';
import { setAccentColor, setThemeMode, themeManager } from '@store/slices/theme';
import { ThemeModeEnum } from '@ts/theme';
import { DARK_COLOR_LIST, LIGHT_COLOR_LIST } from '@constants/colors';
import { useMemo } from 'react';

const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useAppSelector(themeManager);
  const { mode, accentColorIndex } = theme;

  const isLightMode = mode === ThemeModeEnum.LIGHT;

  const selectedColorList = isLightMode ? DARK_COLOR_LIST : LIGHT_COLOR_LIST;

  const accentColor = useMemo(() => {
    return selectedColorList[accentColorIndex];
  }, [selectedColorList, accentColorIndex]);

  const switchTheme = () => {
    dispatch(setThemeMode(mode === ThemeModeEnum.LIGHT ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT));
  };

  const changeAccentColor = (colorIndex: number) => {
    if (
      colorIndex < 0 ||
      colorIndex >= (isLightMode ? LIGHT_COLOR_LIST.length : DARK_COLOR_LIST.length)
    ) {
      dispatch(setAccentColor(0));
      return;
    }

    dispatch(setAccentColor(colorIndex));
  };

  return {
    ...theme,
    isLightMode,
    accentColor,
    colorList: selectedColorList,
    switchTheme,
    changeAccentColor,
  };
};

export default useTheme;
