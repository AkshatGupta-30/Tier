import { URLS } from '@constants';

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

export const getGoogleSearchUrl = (query: string) => {
  const googleUrl = new URL(URLS.GOOGLE);
  googleUrl.searchParams.append('q', query);
  return googleUrl.toString();
};

export const debounce = (callback: () => void, delay: number) => {
  let timeout: number;

  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(callback, delay);
  };
};
