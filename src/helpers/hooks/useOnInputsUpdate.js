import { useCallback, useEffect } from 'react';

import mapList from '../formHelpers/mapList';
import mapGroups from '@/formHelpers/mapGroups';

export default function useOnInputsUpdate(
  inputs,
  values,
  additionalFields,
  onInputsUpdate,
) {
  useEffect(() => {
    const components = mapGroups(inputs, values, additionalFields);

    onInputsUpdate({
      ...components,
      $list: mapList(inputs, values, additionalFields),
    });
  }, [inputs, values]);
}
