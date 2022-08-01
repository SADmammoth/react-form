import { isEmpty } from 'lodash-es';

export default function calcSliderIndex(
  sliderRef: React.RefObject<HTMLElement>,
  clientX: number,
  partsCount: number,
): number {
  if (!sliderRef.current || isEmpty(sliderRef.current)) return 0;
  const { left, width } = sliderRef.current.getBoundingClientRect();
  return ((clientX - left) / width) * partsCount;
}
