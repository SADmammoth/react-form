import { useEffect } from 'react';
import mapGroups from '@/outputHelpers/mapGroups';
import mapList from '@/outputHelpers/mapList';

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
