import { useState, useEffect } from 'react';
import safeUseEffect from './safeUseEffect';

export default function useValueOptions(fetch) {
  let [valueOptions, setValueOptions] = useState(null);

  safeUseEffect(
    (isUnmounted) => {
      if (fetch instanceof Function) {
        fetch().then((options) => {
          if (!isUnmounted.value) {
            setValueOptions(options);
          }
        });
      } else {
        setValueOptions(fetch);
      }
    },
    [fetch, setValueOptions]
  );

  return [valueOptions, !valueOptions];
}
