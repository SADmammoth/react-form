import { useCallback, useEffect } from 'react';

import useDiff from './useDiff';
import mapGroups from '@/formHelpers/mapGroups';
import getInputs from '@/formHelpers/output/getInputs';

export default function useOnInputsUpdate(
  inputs,
  values,
  additionalFields,
  onInputsUpdate,
) {
  const mapGroupsCb = useCallback(
    (inputs) => mapGroups(inputs, values, additionalFields),
    [inputs, values],
  );

  useEffect(() => {
    onInputsUpdate(getInputs(inputs, values, additionalFields, mapGroupsCb));
  }, [inputs, values]);
}
