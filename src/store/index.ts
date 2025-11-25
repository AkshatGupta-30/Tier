import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import bookmarkReducer from './slices/bookmark';
import modalReducer from './slices/modals';

const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    modal: modalReducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();

export default store;
