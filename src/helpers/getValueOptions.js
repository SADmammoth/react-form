import { useState, useEffect } from 'react';

export default function useValueOptions(fetch) {
  let [valueOptions, setValueOptions] = useState(null);

  useEffect(() => {
    let isUnmounted = false;

    if (fetch instanceof Function) {
      fetch().then((options) => {
        if (!isUnmounted) {
          setValueOptions(options);
        }
      });
    } else {
      setValueOptions(fetch);
    }

    return () => {
      isUnmounted = true;
    };
  }, [fetch, setValueOptions]);

  return [valueOptions, !valueOptions];
}
