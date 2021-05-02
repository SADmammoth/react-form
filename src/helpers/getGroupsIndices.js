export default function getGroupsIndices(input, regex) {
  const matches = input.matchAll(regex);

  const result = [];
  let j = 0;

  const arr = matches[0].slice(1);

  for (let i = 0; i < arr.length; ) {
    if (arr[i + 1] === '') {
      result[j] = arr[i] + arr[i + 2];
      j++;
      i += 3;
      continue;
    }

    result[j] = arr[i];
    j++;
    i++;
  }

  j = 0;
  indices = [];

  result.forEach((x, i) => {
    if (!(i % 2)) {
      indices.push([j, j + x.length]);
    }
    j += x.length;
  });

  return indices;
}
