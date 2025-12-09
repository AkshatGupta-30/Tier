import { SEARCH_ENGINES, type SearchEngineKey } from '@constants/search';
import { URLS } from '@constants';
import type { ToastType } from '@ts/toast';
import store from '@store';
import { popToast, showToast, hideToast } from '@store/slices/toast';

export const truncateText = (text: string, maxLength: number = 16) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

export const getFaviconUrl = (url: string) => {
  const urlObj = new URL(url);
  const faviconUrl = new URL(URLS.FAVICON);
  faviconUrl.searchParams.append('client', 'SOCIAL');
  faviconUrl.searchParams.append('type', 'FAVICON');
  faviconUrl.searchParams.append('fallback_opts', 'TYPE,SIZE,URL');
  faviconUrl.searchParams.append('url', urlObj.origin);
  faviconUrl.searchParams.append('size', '64');
  return faviconUrl.toString();
};

export const getSearchUrl = (query: string, engine: SearchEngineKey) => {
  const searchEngine = SEARCH_ENGINES[engine];
  const searchUrl = new URL(searchEngine.URL);
  searchUrl.searchParams.append(searchEngine.QUERY_PARAM, query);
  return searchUrl.toString();
};


export const appendToast = (message: string, type: ToastType) => {
  const toastIndex = 0;
  
  store.dispatch(showToast({message, type, isVisible: true}));
  setTimeout(() => store.dispatch(hideToast(toastIndex)), 3000);
  setTimeout(() => store.dispatch(popToast()), 3500);
}