import { useState } from 'react';
import { ValueOptions } from '../types/basic';
import safeUseEffect from './safeUseEffect';

export default function useValueOptions(
  fetch: () => Promise<ValueOptions>,
): [ValueOptions | null, boolean] {
  const [valueOptions, setValueOptions] = useState<ValueOptions | null>(null);

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

  const isLoading = !valueOptions && fetch instanceof Function;

  return [valueOptions, isLoading];
}
