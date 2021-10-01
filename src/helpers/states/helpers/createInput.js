import React from 'react';
import Input from '@/basic/Input';
import createInputProps from './createInputProps';

export default function createInput(props, values, additionalFields) {
  const preparedProps = createInputProps(props, values, additionalFields);

  return <Input {...preparedProps} />;
}
