import { useState } from 'react';

export default function useRange(from, to, max) {
  let [left, setLeft] = useState(from);
  let [right, setRight] = useState(to);

  let setLeftIndex = (newLeft) => {
    if (newLeft > 0 && newLeft <= right) {
      setLeft(newLeft);
    }
  };

  let setRightIndex = (newRight) => {
    if (newRight <= max - 1 && newRight >= left) {
      setRight(newRight);
    }
  };

  return [left, right, setLeftIndex, setRightIndex];
}
