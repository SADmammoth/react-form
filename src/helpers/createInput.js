import React from 'react';

import Input from '../components/basic/Input';
import createInputProps from './formStateHelpers/createInputProps';

export default function createInput(props, values, additionalFields) {
  const preparedProps = createInputProps(props, values, additionalFields);

  return <Input {...preparedProps} />;
}
