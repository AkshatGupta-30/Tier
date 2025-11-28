import { useDispatch } from 'react-redux';

import { DARK_BACKGROUND_OPTIONS, LIGHT_BACKGROUND_OPTIONS } from '@constants/colors';
import { useAppSelector } from '@store';
import { setThemeBackgroundOption, setThemeMode, themeManager } from '@store/slices/theme';
import { ThemeModeEnum, type BackgroundOption } from '@ts/theme';

const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useAppSelector(themeManager);
  const { mode, backgroundOption } = theme;

  const isLightMode = mode === ThemeModeEnum.LIGHT;

  const BACKGROUND_OPTIONS = isLightMode ? LIGHT_BACKGROUND_OPTIONS : DARK_BACKGROUND_OPTIONS;

  const switchTheme = (theme: ThemeModeEnum) => {
    dispatch(setThemeMode(theme));
  };

  const switchBackgroundOption = (newBackgroundOption: BackgroundOption) => {
    document.body.classList.remove(...backgroundOption.classes.split(' '));
    document.body.classList.add(...newBackgroundOption.classes.split(' '));
    dispatch(setThemeBackgroundOption(newBackgroundOption));
  };

  return {
    ...theme,
    isLightMode,
    switchTheme,
    BACKGROUND_OPTIONS,
    switchBackgroundOption,
    backgroundOption,
  };
};

export default useTheme;
