import React from 'react';

import Input from '../components/basic/Input';
import createInputProps from './formStateHelpers/createInputProps';

export default function createInput(
  props,
  values,
  updateValueCallback,
  additionalFields,
) {
  const preparedProps = createInputProps(
    props,
    updateValueCallback,
    values,
    () => {},
    additionalFields,
  );

  return <Input {...preparedProps} />;
}
