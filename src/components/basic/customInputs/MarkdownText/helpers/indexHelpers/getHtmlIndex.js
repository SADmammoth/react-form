import getDirtyTextIndex from './getDirtyTextIndex';

export default function getHtmlIndex(html, caretIndex) {
  const regexp =
    /(?:<(?:[a-z0-9A-Z]+)[\s]*(?:[^<Fragment>]*)[\s]*>)|(?:<\/[^<Fragment>]+>)|(?:<(?:[a-z0-9A-Z]+)[\s]*(?:[^<Fragment>]*)[\s]*\/>)|(?:[\n])/g;
  return getDirtyTextIndex(regexp, html, caretIndex);
}
