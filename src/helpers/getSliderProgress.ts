import {
  ValueOption,
  ValueOptions,
} from '../types/InputsProps/atomic/ValueOptions';

export function getSliderProgress(
  valueOptions: ValueOptions,
  currentValue?: ValueOption,
) {
  if (!currentValue) return 0;
  const currentIndex = valueOptions.findIndex(
    ({ value }) => value === currentValue.value,
  );

  return currentIndex < 0 ? 0 : currentIndex;
}
