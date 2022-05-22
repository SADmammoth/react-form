import replaceSubstring from './replaceSubstring';

export default function replaceAll(
  string: string,
  startIndex: number,
  endIndex: number,
  charsToReplaceRegex: RegExp,
  newSubstring: string,
): string {
  if (endIndex <= startIndex || startIndex >= string.length) {
    return string;
  }

  const range = string.slice(startIndex, endIndex);
  return replaceSubstring(
    string,
    startIndex,
    endIndex,
    range.replace(charsToReplaceRegex, newSubstring),
  );
}
