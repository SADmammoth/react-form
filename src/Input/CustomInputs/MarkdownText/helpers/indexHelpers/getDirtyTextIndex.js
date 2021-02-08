export default function getDirtyTextIndex(regexp, text, caretIndex) {
  let matches = text.matchAll(regexp);

  let nextMatch = matches.next();
  if (nextMatch.done) {
    return caretIndex;
  }

  let nextIndex = nextMatch.value.index;
  let currentCaretIndex = 0;
  let realIndex = 0;

  while (currentCaretIndex <= caretIndex) {
    if (nextMatch.done) {
      realIndex++;
      currentCaretIndex++;
      continue;
    }

    if (nextIndex === realIndex) {
      realIndex += nextMatch.value[0].length - 1;
      nextMatch = matches.next();
      if (nextMatch.done) {
        nextIndex = -1;
        continue;
      }
      nextIndex = nextMatch.value.index;
    }

    realIndex++;
    currentCaretIndex++;
  }

  return realIndex;
}

// export default function getDirtyTextIndex(regexp, text, caretIndex) {
//   let arr = text.split(regexp);
//   let matches = text.matchAll(regexp);

//   console.log(
//     arr,
//     text,
//     arr
//       .map((item, i) =>
//         matches[i] ? [...item.split(''), matches[i]] : item.split('')
//       )
//       .flat()
//       .slice(0, caretIndex)
//       .reduce((acc, item) => (acc += item.length), 0)
//   );
//   console.log(
//     arr,
//     matches,
//     arr
//       .map((item, i) =>
//         matches[i] ? [...item.split(''), matches[i]] : item.split('')
//       )
//       .flat()
//       .slice(0, caretIndex)
//   );
//   return arr
//     .map((item, i) =>
//       matches[i] ? [...item.split(''), matches[i]] : item.split('')
//     )
//     .flat()
//     .slice(0, caretIndex)
//     .reduce((acc, item) => (item ? (acc += item.length) : acc), 0);
// }
