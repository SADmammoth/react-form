import { isArray } from 'lodash-es';

export default function bindFields(fieldOne, fieldTwo, putOne, putTwo) {
  if (
    fieldOne.updatedAt === fieldTwo.updatedAt ||
    fieldOne.bind === fieldTwo.name ||
    (isArray(fieldOne) && fieldOne.bind.includes(fieldTwo.name))
  ) {
    return;
  }

  if (fieldOne.updatedAt > fieldTwo.updatedAt) {
    return putTwo({
      ...fieldTwo,
      value: fieldOne.value,
      updatedAt: fieldOne.updatedAt,
    });
  }

  return putOne({
    ...fieldOne,
    value: fieldTwo.value,
    updatedAt: fieldTwo.updatedAt,
  });
}
