import { useState } from 'react';

export type UseStateArrayReturnValue<T> = {
  state: T[];
  push: (item: T) => void;
  setItem: (index: number, item: T) => void;
  insert: (index: number, item: T) => void;
  set: React.Dispatch<React.SetStateAction<T[]>>;
};

export function useStateArray<T>(init: T[]): UseStateArrayReturnValue<T> {
  const [state, setState] = useState<T[]>(init);

  const push = (item: T) => {
    setState(() => [...state, item]);
  };

  const setItem = (index: number, item: T) => {
    setState(() => [
      ...state.slice(0, index),
      item,
      ...state.slice(index + 1, state.length),
    ]);
  };

  const insert = (index: number, item: T) => {
    setState(() => [
      ...state.slice(0, index),
      item,
      ...state.slice(index, state.length),
    ]);
  };

  return { state, push, setItem, insert, set: setState };
}
