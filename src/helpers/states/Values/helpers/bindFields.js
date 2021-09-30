import { isArray } from 'lodash-es';

export default function bindFields(fieldOne, fieldTwo, putOne, putTwo) {
  console.log(fieldOne, fieldTwo);
  if (
    fieldOne.bind === fieldTwo.name ||
    (isArray(fieldOne) &&
      fieldOne.bind.includes((name) => name === fieldTwo.name))
  ) {
    if (fieldOne.updatedAt === fieldTwo.updatedAt) return;
    if (fieldOne.updatedAt < fieldTwo.updatedAt) {
      return putOne({
        ...fieldOne,
        value: fieldTwo.value,
        updatedAt: fieldTwo.updatedAt,
      });
    }
  }
  if (fieldOne.updatedAt > fieldTwo.updatedAt) {
    return putTwo({
      ...fieldTwo,
      value: fieldOne.value,
      updatedAt: fieldOne.updatedAt,
    });
  }
}
