import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import bookmarkReducer from './slices/bookmark';
import modalsReducer from './slices/modals';
import searchReducer from './slices/search';
import themeReducer from './slices/theme';

export const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    modal: modalsReducer,
    theme: themeReducer,
    search: searchReducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();

export default store;
