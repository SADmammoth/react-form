import { useState } from 'react';

export type UseStateArrayReturnValue<T> = [
  state: T[],
  push: (item: T) => void,
  insert: (index: number, item: T) => void,
  set: React.Dispatch<React.SetStateAction<T[]>>,
];

export function useStateArray<T>(init: T[]): UseStateArrayReturnValue<T> {
  const [state, setState] = useState<T[]>(init);

  const push = (item: T) => {
    setState(() => [...state, item]);
  };

  const insert = (index: number, item: T) => {
    setState(() => [
      ...state.slice(0, index),
      item,
      ...state.slice(index + 1, state.length),
    ]);
  };

  return [state, push, insert, setState];
}
