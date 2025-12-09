import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import bookmarkReducer from './slices/bookmark';
import modalReducer from './slices/modals';
import searchReducer from './slices/search';
import themeReducer from './slices/theme';
import toastReducer from './slices/toast';

export const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    modal: modalReducer,
    toast: toastReducer,
    theme: themeReducer,
    search: searchReducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();

export default store;
