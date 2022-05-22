import { isObject, transform } from 'lodash-es';
import compareObjects from './compareObjects';

export default function deepDiffArrays(
  objectLeft: (object | null)[],
  objectRight: (object | null)[],
) {
  type Obj = { [key: string | number]: unknown } | unknown[];

  function changes(object: any, base: any): Obj {
    return transform<Obj, Obj>(object, (result, value, key) => {
      if (!compareObjects(value, base[key])) {
        result[key] =
          isObject(value) && isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }
  return (changes(objectLeft, objectRight) as object[]).filter(
    (item) => !!item,
  );
}
