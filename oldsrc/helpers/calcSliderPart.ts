import { isEmpty } from 'lodash-es';

export default function calcSliderPart(
  sliderRef: React.RefObject<HTMLElement>['current'],
  length: number,
) {
  if (!sliderRef || isEmpty(sliderRef)) return 0;
  const boundingRect = sliderRef.getBoundingClientRect();
  const { width } = boundingRect;
  return width / length;
}
