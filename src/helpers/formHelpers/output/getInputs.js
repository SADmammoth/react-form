import React from 'react';

import Input from '@/basic/Input';

export default function getInputs(inputs, mapGroupsCb) {
  return {
    ...mapGroupsCb(inputs),
    $list: [...Object.values(inputs || {})]
      .filter(({ hidden }) => !hidden)
      .map((inputprops) => <Input {...inputprops} />),
  };
}
