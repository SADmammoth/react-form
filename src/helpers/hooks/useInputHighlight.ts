import { useCallback, useState } from 'react';
import { HighlightedInputData, UseNotificationsResult } from '../types/basic';
import safeUseEffect from './safeUseEffect';

const useInputHighlight = (
  highlight: (data: HighlightedInputData) => void,
  unhighlight: (data: HighlightedInputData) => void,
  timer: number,
  notifications: UseNotificationsResult,
) => {
  const [highlightedData, setHighlighted] =
    useState<HighlightedInputData | null>(null);

  const highlightInput = (name: string, errorMessage: string) => {
    highlight({ name });
    notifications.error(errorMessage);
    setHighlighted({ name, errorMessage });
  };

  const startTimeout = useCallback(
    (isUnmounted) => {
      let levels = 0;

      setTimeout(() => {
        if (highlightedData && !isUnmounted.value) {
          unhighlight(highlightedData);
          setHighlighted(null);
        } else if (levels < 5) {
          levels += 1;
          startTimeout(isUnmounted);
        }
      }, timer);
    },
    [timer, unhighlight],
  );

  safeUseEffect(
    (isUnmounted) => {
      if (highlightedData) {
        startTimeout(isUnmounted);
      }
    },
    [highlightedData],
  );

  return highlightInput;
};

export default useInputHighlight;
