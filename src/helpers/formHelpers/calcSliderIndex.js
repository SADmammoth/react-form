import _ from 'lodash';

export default function calcSliderIndex(sliderRef, clientX, partsCount) {
  if (_.isEmpty(sliderRef)) return 0;
  let { left, width } = sliderRef.getBoundingClientRect();
  return parseInt(((clientX - left) / width) * partsCount);
}
