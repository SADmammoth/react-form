import { useEffect } from 'react';

type SetData = (data: FormData) => void;
type ResetData = () => void;

export default function usePersistFormData<FormData>(
  id: string,
  restoreData: (data: FormData) => void,
): [SetData, ResetData] {
  const setData: SetData = (data) => {
    if (!data) return;
    sessionStorage.setItem(`${id}_data`, JSON.stringify(data));
  };

  const resetData: ResetData = () => {
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
