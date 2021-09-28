import { useCallback, useEffect } from 'react';

import mapList from '../formHelpers/mapList';
import mapGroups from '@/formHelpers/mapGroups';

export default function useOnInputsUpdate(
  inputs,
  values,
  updateValueCallback,
  additionalFields,
  onInputsUpdate,
) {
  useEffect(() => {
    const components = mapGroups(
      inputs,
      values,
      updateValueCallback,
      additionalFields,
    );

    onInputsUpdate({
      ...components,
      $list: mapList(inputs, values, updateValueCallback, additionalFields),
    });
  }, [inputs, values]);
}
