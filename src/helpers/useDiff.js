import { useEffect, useState } from 'react';
import _ from 'lodash';
import compareObjects from './compareObjects';

export default function useDiff(callback, values) {
  const [savedValues, setSavedValues] = useState(null);

  useEffect(() => {
    if (!savedValues) {
      callback(savedValues);
      setSavedValues(values);
      return;
    }
    console.log(savedValues, values);
    if (!values.every((value, i) => compareObjects(savedValues[i], value))) {
      callback(difference(values, savedValues), values, savedValues);
      setSavedValues(values);
    }
  }, values);
}

function difference(object, base) {
  function changes(object, base) {
    return _.transform(object, function (result, value, key) {
      if (!compareObjects(value, base[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }
  return changes(object, base).filter((item) => !!item);
}
