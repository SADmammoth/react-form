import { isEmpty } from 'lodash-es';

export default function calcSliderPart(sliderRef, length) {
  if (isEmpty(sliderRef)) return 0;
  const boundingRect = sliderRef.getBoundingClientRect();
  const { width } = boundingRect;
  return width / length;
}
