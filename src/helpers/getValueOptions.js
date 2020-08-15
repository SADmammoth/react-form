import { useState, useEffect } from 'react';

export default function useValueOptions(fetch) {
  let [valueOptions, setValueOptions] = useState(null);

  if (fetch instanceof Function) {
    useEffect(() => {
      fetch().then((options) => setValueOptions(options));
    }, [setValueOptions]);
  } else {
    setValueOptions(fetch);
  }

  return [valueOptions, !valueOptions];
}
