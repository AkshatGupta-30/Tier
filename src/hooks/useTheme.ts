import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { DARK_BACKGROUND_OPTIONS, LIGHT_BACKGROUND_OPTIONS } from '@constants/colors';
import { useAppSelector } from '@store';
import { setThemeBackgroundOption, setThemeMode, themeManager } from '@store/slices/theme';
import { ThemeModeEnum } from '@ts/theme';

const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useAppSelector(themeManager);
  const { mode, backgroundOptionIndex } = theme;

  const isLightMode = mode === ThemeModeEnum.LIGHT;

  const BACKGROUND_OPTIONS = useMemo(
    () => (isLightMode ? LIGHT_BACKGROUND_OPTIONS : DARK_BACKGROUND_OPTIONS),
    [isLightMode],
  );

  const backgroundColor = useMemo(
    () => BACKGROUND_OPTIONS[backgroundOptionIndex],
    [BACKGROUND_OPTIONS, backgroundOptionIndex],
  );

  const updateDomBackground = (oldClassString: string, newClassString: string) => {
    document.body.classList.remove(...oldClassString.split(' '));
    document.body.classList.add(...newClassString.split(' '));
  };

  const switchTheme = useCallback(
    (newTheme: ThemeModeEnum) => {
      if (newTheme === ThemeModeEnum.DARK) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }

      const nextOptions =
        newTheme === ThemeModeEnum.LIGHT ? LIGHT_BACKGROUND_OPTIONS : DARK_BACKGROUND_OPTIONS;
      const nextBackground = nextOptions[0];

      updateDomBackground(backgroundColor.classes, nextBackground.classes);

      dispatch(setThemeMode(newTheme));
      dispatch(setThemeBackgroundOption(0));
    },
    [backgroundColor.classes, dispatch],
  );

  const switchBackgroundOption = useCallback(
    (newBackgroundOptionIndex: number) => {
      const newBackgroundOption = BACKGROUND_OPTIONS[newBackgroundOptionIndex];

      updateDomBackground(backgroundColor.classes, newBackgroundOption.classes);
      dispatch(setThemeBackgroundOption(newBackgroundOptionIndex));
    },
    [BACKGROUND_OPTIONS, backgroundColor.classes, dispatch],
  );

  return {
    ...theme,
    isLightMode,
    switchTheme,
    backgroundColor,
    backgroundOptionIndex,
    switchBackgroundOption,
    BACKGROUND_OPTIONS,
  };
};

export default useTheme;
