import React, { ReactElement } from 'react';
//@ts-ignore
import Input from '@/basic/Input';
import {
  InputState,
  SharedInputProps,
  ValuesState,
} from '@/helpers/types/basic';
import createInputProps from './createInputProps';

export default function createInput(
  props: InputState,
  values: ValuesState,
  sharedInputProps: SharedInputProps,
): ReactElement {
  const preparedProps = createInputProps(props, values, sharedInputProps);

  return <Input {...preparedProps} />;
}
