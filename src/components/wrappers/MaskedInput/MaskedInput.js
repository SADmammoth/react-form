import Mask from '../Mask';

export default function MaskedInput(mask, byCharValidator, maskType, input) {
  if (mask && mask !== '') {
    return Mask(input, mask, !byCharValidator, maskType);
  }
  return input;
}
