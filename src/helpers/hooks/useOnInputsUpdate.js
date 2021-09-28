import { useCallback, useEffect } from 'react';

import useDiff from './useDiff';
import mapGroups from '@/formHelpers/mapGroups';
import getInputs from '@/formHelpers/output/getInputs';

export default function useOnInputsUpdate(
  inputs,
  values,
  updateValueCallback,
  additionalFields,
  onInputsUpdate,
) {
  const mapGroupsCb = useCallback(
    (inputs) =>
      mapGroups(inputs, values, updateValueCallback, additionalFields),
    [inputs, values],
  );

  useEffect(() => {
    onInputsUpdate(
      getInputs(
        inputs,
        values,
        updateValueCallback,
        additionalFields,
        mapGroupsCb,
      ),
    );
  }, [inputs, values]);
}
