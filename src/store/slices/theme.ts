import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { ThemeModeEnum } from '@ts/theme';

interface ThemeState {
  mode: ThemeModeEnum;
  backgroundOptionIndex: number;
  backgroundBlur: number;
  backgroundOverlay: number;
  hideQuote: boolean;
}

const initialState: ThemeState = {
  mode: ThemeModeEnum.LIGHT,
  backgroundOptionIndex: 0,
  backgroundBlur: 0,
  backgroundOverlay: 0,
  hideQuote: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, { payload }: PayloadAction<ThemeModeEnum>) => {
      state.mode = payload;
    },
    setThemeBackgroundOption: (state, { payload }: PayloadAction<number>) => {
      state.backgroundOptionIndex = payload;
    },
    setBackgroundBlur: (state, { payload }: PayloadAction<number>) => {
      state.backgroundBlur = payload;
    },
    setBackgroundOverlay: (state, { payload }: PayloadAction<number>) => {
      state.backgroundOverlay = payload;
    },
    setHideQuote: (state, { payload }: PayloadAction<boolean>) => {
      state.hideQuote = payload;
    },
  },
});

export const {
  setThemeMode,
  setThemeBackgroundOption,
  setBackgroundBlur,
  setBackgroundOverlay,
  setHideQuote,
} = themeSlice.actions;

export const themeInitialState = initialState;

export const themeManager = (state: { theme: ThemeState }) => state.theme;

export default themeSlice.reducer;
