import getDirtyTextIndex from './getDirtyTextIndex';
import regexpEscape from '@/Validator/helpers/regexpEscape';

export default function getMarkdownIndex(text, caretIndex, markdownMap) {
  const regexp = new RegExp(
    Object.values(markdownMap)
      .map(([html, md]) => `(${regexpEscape(md)})`)
      .join('|'),
    'g',
  );
  return getDirtyTextIndex(regexp, text, caretIndex);
}
