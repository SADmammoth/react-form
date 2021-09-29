export default function bindFields(fieldOne, fieldTwo, putOne, putTwo) {
  console.log(
    'onetwo',
    { ...fieldOne },
    { ...fieldTwo },
    fieldOne.updatedAt > fieldTwo.updatedAt,
  );
  if (fieldOne.updatedAt === fieldTwo.updatedAt) {
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
