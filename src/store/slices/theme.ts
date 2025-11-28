import { LIGHT_BACKGROUND_OPTIONS } from '@constants/colors';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { ThemeModeEnum, type BackgroundOption } from '@ts/theme';

interface ThemeState {
  mode: ThemeModeEnum;
  backgroundOption: BackgroundOption;
}

const initialState: ThemeState = {
  mode: ThemeModeEnum.LIGHT,
  backgroundOption: LIGHT_BACKGROUND_OPTIONS[0],
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, { payload }: PayloadAction<ThemeModeEnum>) => {
      state.mode = payload;
    },
    setThemeBackgroundOption: (state, { payload }: PayloadAction<BackgroundOption>) => {
      state.backgroundOption = payload;
    },
  },
});

export const { setThemeMode, setThemeBackgroundOption } = themeSlice.actions;

export const themeManager = (state: { theme: ThemeState }) => state.theme;

export default themeSlice.reducer;
