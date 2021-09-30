import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash-es';

export default function useIndex(init, max) {
  const [index, setIndex] = useState(init);

  useEffect(() => {
    debounce(() => setIndex(init), 10);
  }, [init]);

  const moveIndex = useCallback(
    (newIndex) => {
      if (typeof newIndex === 'function') {
        setIndex((currentIndex) => {
          const indexToSave = newIndex(currentIndex);
          return indexToSave >= 0 && indexToSave <= max - 1
            ? indexToSave
            : currentIndex;
        });
        return;
      }

      if (newIndex >= 0 && newIndex <= max - 1) {
        setIndex(newIndex);
      }
    },
    [max],
  );

  const prevIndex = () => {
    moveIndex((i) => i - 1);
  };

  const nextIndex = () => {
    moveIndex((i) => i + 1);
  };

  return [index, moveIndex, prevIndex, nextIndex];
}
