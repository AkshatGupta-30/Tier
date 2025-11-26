import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { LIGHT_COLOR_LIST } from '@constants/colors';
import { ThemeModeEnum } from '@ts/theme';

interface ThemeState {
  mode: ThemeModeEnum;
  accentColorIndex: number
}

const initialState: ThemeState = {
  mode: ThemeModeEnum.LIGHT,
  accentColorIndex: 0
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, { payload }: PayloadAction<ThemeModeEnum>) => {
      state.mode = payload;
    },
    setAccentColor: (state, { payload }: PayloadAction<number>) => {
      state.accentColorIndex = payload;
    },
  },
});

export const { setThemeMode, setAccentColor } = themeSlice.actions;

export const themeManager = (state: { theme: ThemeState }) => state.theme;

export default themeSlice.reducer;
