import convertersMap from '@/Validator/convertersMap';

export default function getConvertersIn(inputProps) {
  let converterIn = inputProps.converters?.in || ((a) => a);

  if (typeof inputProps.converters === 'string') {
    converterIn = convertersMap[inputProps.converters].in;
  }

  return converterIn;
}
