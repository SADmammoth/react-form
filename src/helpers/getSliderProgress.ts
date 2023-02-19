import {
  ValueOption,
  ValueOptions,
} from '../types/InputsProps/atomic/ValueOptions';

export function getSliderProgress(
  valueOptions: ValueOptions,
  currentValue?: ValueOption,
  defaultIndex = 0,
) {
  if (!currentValue) return defaultIndex;
  const currentIndex = valueOptions.findIndex(
    ({ value }) => value === currentValue.value,
  );

  return currentIndex < 0 ? defaultIndex : currentIndex;
}
