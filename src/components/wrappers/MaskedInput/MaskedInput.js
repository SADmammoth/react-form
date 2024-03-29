import Mask from '../Mask';

export default function MaskedInput(mask, maskType, input) {
  if (mask && mask !== '') {
    return Mask(input, mask, maskType);
  }
  return input;
}
