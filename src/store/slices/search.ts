import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { SEARCH_ENGINES, type SearchEngineKey, SearchEngineEnum } from '@constants/search';

const STORAGE_KEY = 'tier_search_engine';

interface SearchState {
  selectedEngine: SearchEngineKey;
}

const getInitialEngine = (): SearchEngineKey => {
  const savedEngine = localStorage.getItem(STORAGE_KEY);
  if (savedEngine && savedEngine in SEARCH_ENGINES) {
    return savedEngine as SearchEngineKey;
  }
  return SearchEngineEnum.GOOGLE;
};

const initialState: SearchState = {
  selectedEngine: getInitialEngine(),
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchEngine: (state, action: PayloadAction<SearchEngineKey>) => {
      state.selectedEngine = action.payload;
      localStorage.setItem(STORAGE_KEY, action.payload);
    },
  },
});

export const { setSearchEngine } = searchSlice.actions;
export default searchSlice.reducer;
