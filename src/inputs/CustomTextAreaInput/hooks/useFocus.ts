import { ForwardedRef, RefObject, useEffect, useRef, useState } from 'react';

export type UseFocusReturnValue = {
  refByIndex: (index: number) => RefObject<HTMLElement> | null;
  focus: (index: number) => void;
  focusInit: () => void;
  focusNext: () => void;
  unfocus: () => void;
  focusIndex: number;
};

export function useFocus(
  parentInputRef: RefObject<HTMLElement>,
): UseFocusReturnValue {
  const [focusIndex, setFocusIndex] = useState(-1);

  const refByIndex = (index: number) => {
    return index === focusIndex ? parentInputRef : null;
  };

  useEffect(() => {
    console.log(parentInputRef?.current);
    if (focusIndex !== -1) {
      parentInputRef?.current?.focus();
    }
  }, [focusIndex]);

  const focus = (index: number) => {
    if (index === focusIndex) {
      return;
    }
    console.log('FOCUS', index);
    setFocusIndex(0);
  };

  const focusInit = () => {
    if (focusIndex === -1) {
      setFocusIndex(0);
    }
  };

  const focusNext = () => {
    console.log('FOCUS NEXT', focusIndex + 1);
    setFocusIndex(focusIndex + 1);
  };

  const unfocus = () => {
    console.log('UNFOCUS');
    setFocusIndex(-1);
  };

  return { refByIndex, focus, focusInit, focusNext, unfocus, focusIndex };
}
