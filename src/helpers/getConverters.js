import convertersMap from '@/Validator/convertersMap';

export default function getConverters(inputProps) {
  let converterIn = inputProps.converters || { in: (a) => a, out: (b) => b };

  if (typeof inputProps.converters === 'string') {
    converterIn = convertersMap[inputProps.converters];
  }

  return converterIn;
}
