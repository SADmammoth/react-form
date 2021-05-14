import { useEffect } from 'react';

export default function safeUseEffect(callback, deps) {
  useEffect(() => {
    const isUnmounted = { value: false };

    callback(isUnmounted);

    return () => {
      isUnmounted.value = true;
    };
  }, deps);
}
