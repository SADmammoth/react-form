export default function getUniqueItems(array) {
  return array.filter((el, i, arr) => arr.slice(i + 1).indexOf(el) < 0);
}
