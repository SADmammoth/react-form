import { useState, useEffect } from 'react';

export default function useValueOptions(fetch) {
  let [valueOptions, setValueOptions] = useState(null);

  useEffect(() => {
    if (fetch instanceof Function) {
      fetch().then((options) => setValueOptions(options));
    } else {
      setValueOptions(fetch);
    }
  }, [setValueOptions]);

  return [valueOptions, !valueOptions];
}