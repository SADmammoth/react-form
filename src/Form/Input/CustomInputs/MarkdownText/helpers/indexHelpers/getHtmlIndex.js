import getDirtyTextIndex from './getDirtyTextIndex';

export default function getHtmlIndex(html, caretIndex) {
  let regexp = /(?:<(?:[a-z0-9A-Z]+)[\s]*(?:[^<>]*)[\s]*>)|(?:<\/[^<>]+>)|(?:<(?:[a-z0-9A-Z]+)[\s]*(?:[^<>]*)[\s]*\/>)|(?:[\n])/g;
  return getDirtyTextIndex(regexp, html, caretIndex);
}
