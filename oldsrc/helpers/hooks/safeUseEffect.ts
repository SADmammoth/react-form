import { useEffect } from 'react';

export default function safeUseEffect(
  callback: (isUnmounted: { value: boolean }) => void,
  deps: unknown[],
) {
  useEffect(() => {
    const isUnmounted = { value: false };

    callback(isUnmounted);

    return () => {
      isUnmounted.value = true;
    };
  }, deps);
}
