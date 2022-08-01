import { useEffect, useState } from 'react';
import { transform, isObject } from 'lodash-es';
import compareObjects from '@/genericHelpers/compareObjects';
import deepDiffArrays from '../generic/deepDiffArrays';
import safeUseEffect from './safeUseEffect';

export default function useSafeDiff(
  callback: (
    isUnmounted: { value: boolean },
    diff: (object | null)[],
    values: (object | null)[],
    savedValues: (object | null)[],
  ) => void,
  values: ({
    [key: string]: unknown;
  } | null)[],
) {
  const [savedValues, setSavedValues] = useState<
    | ({
        [key: string]: unknown;
      } | null)[]
  >(new Array(values.length).fill(null));

  safeUseEffect((isUnmonted) => {
    if (!savedValues) {
      const empty = new Array(values.length).fill(null);
      callback(isUnmonted, savedValues, empty, empty);
      setSavedValues(values);
      return;
    }

    if (!values.every((value, i) => compareObjects(savedValues[i], value))) {
      callback(
        isUnmonted,
        deepDiffArrays(values, savedValues),
        values,
        savedValues,
      );
      setSavedValues(values);
    }
  }, values);
}
