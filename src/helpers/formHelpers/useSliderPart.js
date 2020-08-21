import { useRef, useEffect, useState } from 'react';

export default function useSliderPart(length) {
  let sliderRef = useRef({});

  let [part, setPart] = useState(0);

  useEffect(() => {
    let width = sliderRef.current.getBoundingClientRect().width;

    setPart(width / length);
  }, [sliderRef, length]);

  return [sliderRef, part];
}
