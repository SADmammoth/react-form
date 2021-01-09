import { useState, useEffect, useCallback } from 'react';

export default function useIndex(init, max) {
  let [index, setIndex] = useState(init);

  useEffect(() => {
    setIndex(init);
  }, [init]);

  const setIndexExport = useCallback(
    (newIndex) => {
      if (typeof newIndex === 'function') {
        setIndex((index) => {
          const indexToSave = newIndex(index);
          return indexToSave >= 0 && indexToSave <= max - 1
            ? indexToSave
            : index;
        });
        return;
      }

      if (newIndex >= 0 && newIndex <= max - 1) {
        setIndex(newIndex);
      }
    },
    [max]
  );

  return [index, setIndexExport];
}
