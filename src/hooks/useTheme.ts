import { useDispatch } from 'react-redux';

import { useAppSelector } from '@store';
import { setThemeMode, themeManager } from '@store/slices/theme';
import { ThemeModeEnum } from '@ts/theme';

const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useAppSelector(themeManager);
  const { mode } = theme;

  const isLightMode = mode === ThemeModeEnum.LIGHT;

  const switchTheme = () => {
    dispatch(setThemeMode(mode === ThemeModeEnum.LIGHT ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT));
  };

  return { ...theme, isLightMode, switchTheme };
};

export default useTheme;
