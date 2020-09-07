import getDirtyTextIndex from './getDirtyTextIndex';

export default function getHtmlIndex(html, caretIndex) {
  let regexp = /(<([a-z0-9A-Z]+)[\s]*([^<>]*)[\s]*>)|(<\/[^<>]+>)|(<([a-z0-9A-Z]+)[\s]*([^<>]*)[\s]*\/>)|([\n])/g;
  console.log(caretIndex, getDirtyTextIndex(regexp, html, caretIndex));
  return getDirtyTextIndex(regexp, html, caretIndex);
}
