import { useState } from 'react';

export type UseStateArrayReturnValue<T> = {
  state: T[];
  push: (item: T) => void;
  pop: () => T;
  removeIndex: (index: number) => T;
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
    setState((state) => {
      return [
        ...state.slice(0, index),
        item,
        ...state.slice(index + 1, state.length),
      ];
    });
  };

  const insert = (index: number, item: T) => {
    setState((state) => [
      ...state.slice(0, index),
      item,
      ...state.slice(index, state.length),
    ]);
  };

  const pop = () => {
    const removed = state[state.length - 1];
    setState((state) => state.slice(0, state.length - 1));
    return removed;
  };

  const removeIndex = (index: number) => {
    const removed = state[index];
    setState((state) => [
      ...state.slice(0, index),
      ...state.slice(index + 1, state.length),
    ]);

    return removed;
  };

  return { state, push, pop, removeIndex, setItem, insert, set: setState };
}
