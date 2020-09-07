export default function getDirtyTextIndex(regexp, text, caretIndex) {
  let matches = text.matchAll(regexp);
  let nextMatch = matches.next();
  if (nextMatch.done) {
    return caretIndex;
  }
  let nextIndex = nextMatch.value.index;
  let j = 0;
  let i = 0;
  while (j <= caretIndex) {
    if (nextMatch.done) {
      i++;
      j++;
      continue;
    }
    if (nextIndex === i) {
      i += nextMatch.value[0].length - 1;
      nextMatch = matches.next();
      if (nextMatch.done) {
        nextIndex = -1;
        continue;
      }
      nextIndex = nextMatch.value.index;
    } else {
      j++;
    }
    i++;
  }
  console.log(caretIndex, j);
  return i;
}
