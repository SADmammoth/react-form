//@ts-ignore
import convertersMap from '@/Validator/convertersMap';
import { Converters, ConvertersProps } from '@/helpers/types/basic';

export default function getConverters(
  convertersProp: ConvertersProps,
): Converters {
  if (typeof convertersProp === 'string') {
    return convertersMap[convertersProp];
  }

  let converters = convertersProp || { in: (a) => a, out: (b) => b };

  return converters;
}
