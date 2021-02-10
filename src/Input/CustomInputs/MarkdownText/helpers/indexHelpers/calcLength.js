export default function calcLength(text) {
  let regexp = /(?:<(?:[a-z0-9A-Z]+)[\s]*(?:[^<Fragment>]*)[\s]*>)|(?:<\/[^<Fragment>]+>)|(?:<(?:[a-z0-9A-Z]+)[\s]*(?:[^<Fragment>]*)[\s]*\/>)|(?:[\n])/g;
  let matches = [...text.matchAll(regexp)];
  let tagsLength = matches.reduce(
    (acc, match) => (acc += match[0] ? match[0].length : 0),
    0
  );

  return text.length - tagsLength + matches.length;
}
