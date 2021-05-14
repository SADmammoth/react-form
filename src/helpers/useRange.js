import { useState } from 'react';

export default function useRange(from, to, max) {
  const [left, setLeft] = useState(from);
  const [right, setRight] = useState(to);

  const setLeftIndex = (newLeft) => {
    if (newLeft > 0 && newLeft <= right) {
      setLeft(newLeft);
    }
  };

  const setRightIndex = (newRight) => {
    if (newRight <= max - 1 && newRight >= left) {
      setRight(newRight);
    }
  };

  return [left, right, setLeftIndex, setRightIndex];
}
