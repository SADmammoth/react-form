import { useCallback } from 'react';

import useDiff from './useDiff';
import mapGroups from '@/formHelpers/mapGroups';
import getInputs from '@/formHelpers/output/getInputs';

export default function useOnInputsUpdate(inputsProps, state, onInputsUpdate) {
  const mapGroupsCb = useCallback(
    (inputs) => mapGroups(inputs, inputsProps),
    [inputsProps],
  );

  useDiff(
    (diff, values) => {
      if (values) {
        const [inputs] = values;
        onInputsUpdate(getInputs(inputs, mapGroupsCb));
      }
    },
    [state.inputs, state.values],
  );
}
