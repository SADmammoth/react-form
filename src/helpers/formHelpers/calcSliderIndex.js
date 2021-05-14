import { isEmpty } from 'lodash-es';

export default function calcSliderIndex(sliderRef, clientX, partsCount) {
  if (!sliderRef || isEmpty(sliderRef)) return 0;
  const { left, width } = sliderRef.getBoundingClientRect();
  return parseInt(((clientX - left) / width) * partsCount, 10);
}
