import { useState, useEffect } from 'react';

export default function useValueOptions(fetch) {
  let [valueOptions, setValueOptions] = useState(null);

  useEffect(() => {
    console.log(0);
    if (fetch instanceof Function) {
      fetch().then((options) => setValueOptions(options));
    } else {
      setValueOptions(fetch);
    }
  }, [fetch]);

  return [valueOptions, !valueOptions];
}
