import regexpEscape from '../../../../../Validator/regexpEscape';
import getDirtyTextIndex from './getDirtyTextIndex';

export default function getMarkdownIndex(text, caretIndex, markdownMap) {
  let regexp = new RegExp(
    Object.values(markdownMap)
      .map(([html, md]) => `(${regexpEscape(md)})`)
      .join('|'),
    'g'
  );
  return getDirtyTextIndex(regexp, text, caretIndex);
}
