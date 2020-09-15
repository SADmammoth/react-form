export default function calcLength(text) {
  let regexp = /(?:<(?:[a-z0-9A-Z]+)[\s]*(?:[^<>]*)[\s]*>)|(?:<\/[^<>]+>)|(?:<(?:[a-z0-9A-Z]+)[\s]*(?:[^<>]*)[\s]*\/>)|(?:[\n])/g;
  let matches = [...text.matchAll(regexp)];
  let tagsLength = matches.reduce((acc, match) => (acc += match[0].length), 0);

  return text.length - tagsLength + matches.length;
}
