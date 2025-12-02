import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { ThemeModeEnum } from '@ts/theme';

interface ThemeState {
  mode: ThemeModeEnum;
  backgroundOptionIndex: number;
}

const initialState: ThemeState = {
  mode: ThemeModeEnum.LIGHT,
  backgroundOptionIndex: 0,
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
  },
});

export const { setThemeMode, setThemeBackgroundOption } = themeSlice.actions;

export const themeInitialState = initialState;

export const themeManager = (state: { theme: ThemeState }) => state.theme;

export default themeSlice.reducer;
