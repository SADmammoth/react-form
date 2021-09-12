import { useState } from 'react';

import { debounce } from 'lodash';

import useIndex from './useIndex';

export default function useRange(from, to, max) {
  const [left, setLeft] = useIndex(from, max);
  const [right, setRight] = useIndex(to, max);

  const setLeftIndex = (newLeft) => {
    if (newLeft <= right) {
      setLeft(newLeft);
    }
  };

  const setRightIndex = (newRight) => {
    if (newRight >= left) {
      setRight(newRight);
    }
  };

  return [left, right, setLeftIndex, setRightIndex];
}
