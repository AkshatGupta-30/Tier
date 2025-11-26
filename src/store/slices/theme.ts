import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { ThemeModeEnum } from '@ts/theme';

interface ThemeState {
  mode: ThemeModeEnum;
}

const initialState: ThemeState = {
  mode: ThemeModeEnum.LIGHT,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, { payload }: PayloadAction<ThemeModeEnum>) => {
      state.mode = payload;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;

export const themeManager = (state: { theme: ThemeState }) => state.theme;

export default themeSlice.reducer;
