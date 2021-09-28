import React from 'react';

import createInput from '../../createInput';
import Input from '@/basic/Input';

export default function getInputs(
  inputs,
  values,
  updateValueCallback,
  additionalFields,
  mapGroupsCb,
) {
  const components = mapGroupsCb(inputs);
  return {
    ...components,
    $list: [...Object.values(inputs || {})]
      .filter(({ hidden }) => !hidden)
      .map((props) =>
        createInput(props, values, updateValueCallback, additionalFields),
      ),
  };
}
