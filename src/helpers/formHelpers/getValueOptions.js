import { useState } from 'react';

import safeUseEffect from '@/hooks/safeUseEffect';

export default function useValueOptions(fetch) {
  const [valueOptions, setValueOptions] = useState(null);

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
    [fetch, setValueOptions],
  );

  return [valueOptions, !valueOptions];
}
