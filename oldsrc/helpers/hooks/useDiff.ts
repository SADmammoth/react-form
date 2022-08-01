import { useEffect, useState } from 'react';
import compareObjects from '@/genericHelpers/compareObjects';
import deepDiffArrays from '../generic/deepDiffArrays';

export default function useDiff(
  callback: (
    diff: object[] | null,
    values: object[] | null,
    savedValues: object[] | null,
  ) => void,
  values: {
    [key: string]: unknown;
  }[],
) {
  const [savedValues, setSavedValues] = useState<
    | {
        [key: string]: unknown;
      }[]
    | null
  >(null);

  useEffect(() => {
    if (!savedValues) {
      callback(savedValues, null, null);
      setSavedValues(values);
      return;
    }

    if (!values.every((value, i) => compareObjects(savedValues[i], value))) {
      callback(deepDiffArrays(values, savedValues), values, savedValues);
      setSavedValues(values);
    }
  }, values);
}
