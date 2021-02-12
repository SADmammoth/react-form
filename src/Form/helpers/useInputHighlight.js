import { useCallback, useState } from 'react';
import safeUseEffect from '../../helpers/safeUseEffect';

const useInputHighlight = (highlight, unhighlight, timer, notifications) => {
  const [highlightedData, setHighlighted] = useState(null);

  const highlightInput = (name, errorMessage) => {
    highlight(name);
    notifications.error(errorMessage);
    setHighlighted([name, errorMessage]);
  };

  const startTimeout = useCallback(
    (isUnmounted) => {
      const levels = 0;

      setTimeout(() => {
        if (!isUnmounted.value) {
          unhighlight(...highlightedData);
          setHighlighted(null);
        } else if (levels < 5) {
          levels++;
          startTimeout(isUnmounted);
        }
      }, timer);
    },
    [timer, unhighlight]
  );

  safeUseEffect(
    (isUnmounted) => {
      if (highlightedData) {
        startTimeout(isUnmounted);
      }
    },
    [highlightedData]
  );

  return highlightInput;
};

export default useInputHighlight;
