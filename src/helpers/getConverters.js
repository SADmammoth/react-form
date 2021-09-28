import convertersMap from '@/Validator/convertersMap';

export default function getConverters(convertersProp) {
  let converters = convertersProp || { in: (a) => a, out: (b) => b };

  if (typeof convertersProp === 'string') {
    converters = convertersMap[convertersProp];
  }

  return converters;
}
