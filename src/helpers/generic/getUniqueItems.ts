export default function getUniqueItems(array: unknown[]): unknown[] {
  return array.filter((el, i, arr) => arr.slice(i + 1).indexOf(el) < 0);
}
