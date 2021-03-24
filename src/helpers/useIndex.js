import { useState, useEffect, useMemo, useCallback } from 'react';

export default function useIndex(currentValue, valueOptions) {
  const index = useMemo(() => {
    console.log(currentValue);
    let value = currentValue || valueOptions[0].value;

    let currentIndex = valueOptions.findIndex((el) => el.value === value);
    currentIndex = currentIndex < 0 ? 0 : currentIndex;

    return currentIndex;
  }, [currentValue]);

  const max = useMemo(() => {
    return valueOptions.length;
  });

  const setIndex = useCallback(
    (newIndex) => {
      if (typeof newIndex === 'function') {
        const indexToSave = newIndex(index);
        return indexToSave >= 0 && indexToSave <= max - 1 ? indexToSave : index;
      }

      if (newIndex >= 0 && newIndex <= max - 1) {
        return newIndex;
      }
    },
    [max, index]
  );

  return [index, setIndex];
}
