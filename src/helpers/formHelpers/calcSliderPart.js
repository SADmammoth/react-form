import _ from 'lodash';

export default function calcSliderPart(sliderRef, length) {
  if (_.isEmpty(sliderRef)) return 0;
  const boundingRect = sliderRef.getBoundingClientRect();
  const { width } = boundingRect;
  return width / length;
}
