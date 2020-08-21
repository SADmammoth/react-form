import { useState, useEffect } from 'react';

export default function useIndex(init, max) {
  let [index, setIndex] = useState(init);

  useEffect(() => {
    setIndex(init);
  }, [init]);

  return [
    index,
    (newIndex) => {
      if (newIndex >= 0 && newIndex <= max - 1) {
        setIndex(newIndex);
      }
    },
  ];
}
