import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { DARK_BACKGROUND_OPTIONS, LIGHT_BACKGROUND_OPTIONS } from '@constants/colors';
import { useAppSelector } from '@store';
import { setThemeBackgroundOption, setThemeMode, themeManager } from '@store/slices/theme';
import { LocalStorageKeys } from '@ts/storage';
import { ThemeModeEnum } from '@ts/theme';

import useLocalStorage from './useLocalStorage';

const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useAppSelector(themeManager);
  const { mode, backgroundOptionIndex } = theme;

  const { getLocalStorage, setLocalStorage } = useLocalStorage();

  const isLightMode = mode === ThemeModeEnum.LIGHT;

  const BACKGROUND_OPTIONS = useMemo(
    () => (isLightMode ? LIGHT_BACKGROUND_OPTIONS : DARK_BACKGROUND_OPTIONS),
    [isLightMode],
  );

  const backgroundColor = useMemo(
    () => BACKGROUND_OPTIONS[backgroundOptionIndex],
    [BACKGROUND_OPTIONS, backgroundOptionIndex],
  );

  const initializeTheme = () => {
    const savedMode = getLocalStorage<ThemeModeEnum>(LocalStorageKeys.THEME_MODE);
    const savedBackgroundOptionIndex = getLocalStorage<number>(
      LocalStorageKeys.BACKGROUND_OPTION_INDEX,
    );

    if (savedMode&&savedBackgroundOptionIndex) {
      switchTheme(savedMode,savedBackgroundOptionIndex);
    }
  };

  const updateDomBackground = useCallback((oldClassString: string, newClassString: string) => {
    document.body.classList.remove(...oldClassString.split(' '));
    document.body.classList.add(...newClassString.split(' '));
  }, []);

  const switchTheme = useCallback(
    (newTheme: ThemeModeEnum, index?:number) => {
      if (newTheme === ThemeModeEnum.DARK) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }

      const nextOptions =
        newTheme === ThemeModeEnum.LIGHT ? LIGHT_BACKGROUND_OPTIONS : DARK_BACKGROUND_OPTIONS;
      const nextBackground = nextOptions[index ?? 0];

      updateDomBackground(backgroundColor.classes, nextBackground.classes);

      setLocalStorage(LocalStorageKeys.THEME_MODE, newTheme);
      dispatch(setThemeMode(newTheme));
      dispatch(setThemeBackgroundOption(index ?? 0));
    },
    [backgroundColor.classes, dispatch, setLocalStorage, updateDomBackground],
  );

  const switchBackgroundOption = useCallback(
    (newBackgroundOptionIndex: number) => {
      const newBackgroundOption = BACKGROUND_OPTIONS[newBackgroundOptionIndex];

      setLocalStorage(LocalStorageKeys.BACKGROUND_OPTION_INDEX, newBackgroundOptionIndex);
      updateDomBackground(backgroundColor.classes, newBackgroundOption.classes);
      dispatch(setThemeBackgroundOption(newBackgroundOptionIndex));
    },
    [BACKGROUND_OPTIONS, backgroundColor.classes, dispatch, setLocalStorage, updateDomBackground],
  );

  return {
    ...theme,
    isLightMode,
    switchTheme,
    backgroundColor,
    backgroundOptionIndex,
    switchBackgroundOption,
    BACKGROUND_OPTIONS,
    initializeTheme,
  };
};

export default useTheme;
