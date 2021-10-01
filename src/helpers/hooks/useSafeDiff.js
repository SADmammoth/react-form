import { useEffect, useState } from 'react';
import { transform, isObject } from 'lodash-es';
import compareObjects from '@/genericHelpers/compareObjects';
import safeUseEffect from './safeUseEffect';

function difference(objectLeft, objectRight) {
  function changes(object, base) {
    return transform(object, (result, value, key) => {
      if (!compareObjects(value, base[key])) {
        result[key] =
          isObject(value) && isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }
  return changes(objectLeft, objectRight).filter((item) => !!item);
}

export default function useSafeDiff(callback, values) {
  const [savedValues, setSavedValues] = useState(null);

  safeUseEffect((isUnmonted) => {
    if (!savedValues) {
      callback(isUnmonted, savedValues);
      setSavedValues(values);
      return;
    }

    if (!values.every((value, i) => compareObjects(savedValues[i], value))) {
      callback(
        isUnmonted,
        difference(values, savedValues),
        values,
        savedValues,
      );
      setSavedValues(values);
    }
  }, values);
}
