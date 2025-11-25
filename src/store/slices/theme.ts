import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { LIGHT_COLOR_LIST } from '@constants/colors';
import { ThemeModeEnum } from '@ts/theme';

interface ThemeState {
  mode: ThemeModeEnum;
  accentColor: string;
}

const initialState: ThemeState = {
  mode: ThemeModeEnum.LIGHT,
  accentColor: LIGHT_COLOR_LIST[0],
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, { payload }: PayloadAction<ThemeModeEnum>) => {
      state.mode = payload;
    },
    setAccentColor: (state, { payload }: PayloadAction<string>) => {
      state.accentColor = payload;
    },
  },
});

export const { setThemeMode, setAccentColor } = themeSlice.actions;

export const themeManager = (state: { theme: ThemeState }) => state.theme;

export default themeSlice.reducer;
