import { useEffect } from 'react';

export default function usePersistFormData(id, restoreData) {
  const setData = (data) => {
    if (!data) return;
    sessionStorage.setItem(`${id}_data`, JSON.stringify(data));
  };

  const resetData = () => {
    sessionStorage.removeItem(`${id}_data`);
  };

  useEffect(() => {
    if (!restoreData) {
      resetData();
      return;
    }

    const data = sessionStorage.getItem(`${id}_data`);
    if (!data) return;

    restoreData(JSON.parse(data));
  }, []);

  return [setData, resetData];
}
