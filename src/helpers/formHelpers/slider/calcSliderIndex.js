import { isEmpty } from 'lodash-es';

export default function calcSliderIndex(sliderRef, clientX, partsCount) {
  if (!sliderRef.current || isEmpty(sliderRef.current)) return 0;
  const { left, width } = sliderRef.current.getBoundingClientRect();
  return parseInt(((clientX - left) / width) * partsCount, 10);
}
