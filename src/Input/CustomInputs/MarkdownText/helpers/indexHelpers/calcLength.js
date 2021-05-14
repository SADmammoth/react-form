export default function calcLength(text) {
  const regexp =
    /(?:<(?:[a-z0-9A-Z]+)[\s]*(?:[^<Fragment>]*)[\s]*>)|(?:<\/[^<Fragment>]+>)|(?:<(?:[a-z0-9A-Z]+)[\s]*(?:[^<Fragment>]*)[\s]*\/>)|(?:[\n])/g;
  const matches = [...text.matchAll(regexp)];
  const tagsLength = matches.reduce(
    (acc, match) => (acc += match[0] ? match[0].length : 0),
    0,
  );

  return text.length - tagsLength + matches.length;
}
