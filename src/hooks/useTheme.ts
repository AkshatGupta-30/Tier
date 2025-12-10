import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { DARK_BACKGROUND_OPTIONS, LIGHT_BACKGROUND_OPTIONS } from '@constants/colors';
import { useAppSelector } from '@store';
import {
  setThemeBackgroundOption,
  setThemeMode,
  themeInitialState,
  themeManager,
} from '@store/slices/theme';
import { LocalStorageKeys } from '@ts/storage';
import { ThemeModeEnum } from '@ts/theme';
import type { BackgroundOption } from '@ts/theme';
import { ToastType } from '@ts/toast';
import { appendToast } from '@utils';

import useLocalStorage from './useLocalStorage';

const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useAppSelector(themeManager);
  const { mode, backgroundOptionIndex } = theme;
  const isLightMode = mode === ThemeModeEnum.LIGHT;

  const { getLocalStorage, setLocalStorage } = useLocalStorage();

  const customBackgrounds = useMemo(() => {
    const stored = getLocalStorage<BackgroundOption[]>(LocalStorageKeys.CUSTOM_BACKGROUNDS);
    return stored || [];
  }, [getLocalStorage]);

  const selectedImageId = getLocalStorage<string>(LocalStorageKeys.SELECTED_BACKGROUND_IMAGE_ID);

  const BACKGROUND_OPTIONS = useMemo(
    () => (isLightMode ? LIGHT_BACKGROUND_OPTIONS : DARK_BACKGROUND_OPTIONS),
    [isLightMode],
  );

  const backgroundColor = useMemo(
    () => BACKGROUND_OPTIONS[backgroundOptionIndex],
    [BACKGROUND_OPTIONS, backgroundOptionIndex],
  );

  const backgroundImage = useMemo(() => {
    if (!selectedImageId) return null;
    return customBackgrounds.find((bg) => bg.id === selectedImageId) || null;
  }, [customBackgrounds, selectedImageId]);

  const initializeTheme = () => {
    const savedMode = getLocalStorage<ThemeModeEnum>(LocalStorageKeys.THEME_MODE);
    const savedBackgroundOptionIndex = getLocalStorage<number>(
      LocalStorageKeys.BACKGROUND_OPTION_INDEX,
    );

    if (savedMode && savedBackgroundOptionIndex !== null) {
      switchTheme(savedMode, savedBackgroundOptionIndex);
    }
  };

  const updateDomBackground = useCallback((oldBg: BackgroundOption, newBg: BackgroundOption) => {
    // Handle Color Classes
    if (oldBg?.classes) {
      document.body.classList.remove(...oldBg.classes.split(' '));
    }
    if (newBg?.classes) {
      document.body.classList.add(...newBg.classes.split(' '));
    }

    // Background Image is now handled in App.tsx via img tag
  }, []);

  const switchTheme = useCallback(
    (newTheme: ThemeModeEnum, index?: number) => {
      if (newTheme === ThemeModeEnum.DARK) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }

      const nextOptions =
        newTheme === ThemeModeEnum.LIGHT ? LIGHT_BACKGROUND_OPTIONS : DARK_BACKGROUND_OPTIONS;
      const nextBackground =
        nextOptions[index ?? themeInitialState.backgroundOptionIndex] ??
        nextOptions[themeInitialState.backgroundOptionIndex];

      updateDomBackground(backgroundColor, nextBackground);

      setLocalStorage(LocalStorageKeys.THEME_MODE, newTheme);
      dispatch(setThemeMode(newTheme));
      dispatch(setThemeBackgroundOption(index ?? themeInitialState.backgroundOptionIndex));
    },
    [backgroundColor, backgroundImage, dispatch, setLocalStorage, updateDomBackground],
  );

  const switchBackgroundOption = useCallback(
    (newBackgroundOptionIndex: number) => {
      const newBackgroundOption = BACKGROUND_OPTIONS[newBackgroundOptionIndex];

      setLocalStorage(LocalStorageKeys.BACKGROUND_OPTION_INDEX, newBackgroundOptionIndex);
      updateDomBackground(backgroundColor, newBackgroundOption);
      dispatch(setThemeBackgroundOption(newBackgroundOptionIndex));
    },
    [
      BACKGROUND_OPTIONS,
      backgroundColor,
      backgroundImage,
      dispatch,
      setLocalStorage,
      updateDomBackground,
    ],
  );

  const selectBackgroundImage = useCallback(
    (id: string | null) => {
      setLocalStorage(LocalStorageKeys.SELECTED_BACKGROUND_IMAGE_ID, id);
      updateDomBackground(backgroundColor, backgroundColor);
      window.location.reload();
    },
    [backgroundColor, backgroundImage, customBackgrounds, setLocalStorage, updateDomBackground],
  );

  const addCustomBackground = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newBackground: BackgroundOption = {
          id: `custom-${Date.now()}`,
          classes: '',
          type: 'image',
          value: base64String,
          isCustom: true,
        };

        const currentCustomBackgrounds =
          getLocalStorage<BackgroundOption[]>(LocalStorageKeys.CUSTOM_BACKGROUNDS) || [];
        const updatedCustomBackgrounds = [...currentCustomBackgrounds, newBackground];

        try {
          setLocalStorage(LocalStorageKeys.CUSTOM_BACKGROUNDS, updatedCustomBackgrounds);
          setLocalStorage(LocalStorageKeys.SELECTED_BACKGROUND_IMAGE_ID, newBackground.id);

          window.location.reload();
        } catch {
          appendToast('Storage full: Cannot add more images', ToastType.ERROR);
        }
      };
      reader.readAsDataURL(file);
    },
    [getLocalStorage, setLocalStorage],
  );

  const removeCustomBackground = useCallback(
    (id: string) => {
      const currentCustomBackgrounds =
        getLocalStorage<BackgroundOption[]>(LocalStorageKeys.CUSTOM_BACKGROUNDS) || [];
      const updatedCustomBackgrounds = currentCustomBackgrounds.filter((bg) => bg.id !== id);
      setLocalStorage(LocalStorageKeys.CUSTOM_BACKGROUNDS, updatedCustomBackgrounds);

      if (selectedImageId === id) {
        setLocalStorage(LocalStorageKeys.SELECTED_BACKGROUND_IMAGE_ID, null);
      }
      window.location.reload();
    },
    [getLocalStorage, selectedImageId, setLocalStorage],
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
    addCustomBackground,
    customBackgrounds,
    selectedImageId,
    selectBackgroundImage,
    removeCustomBackground,
    backgroundImage,
  };
};

export default useTheme;
