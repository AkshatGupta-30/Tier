import type { LocalStorageKeys } from '@ts/storage';

const useLocalStorage = () => {
  const getLocalStorage = <T>(key: LocalStorageKeys): T | null => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  const setLocalStorage = (key: LocalStorageKeys, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeLocalStorage = (key: LocalStorageKeys) => {
    localStorage.removeItem(key);
  };

  return {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage,
  };
};

export default useLocalStorage;
