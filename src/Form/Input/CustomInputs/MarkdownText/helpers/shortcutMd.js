import tagManager from './tagManager';
import regexpEscape from '../../../../../Validator/regexpEscape';

export default function shortcutMd(html, markdownMap) {
  let newHtml = html.split('');
  let opened = [];

  let regex = new RegExp(
    Object.values(markdownMap)
      .map(([html, md]) => `(${regexpEscape(md)})`)
      .join('|'),
    'g'
  );

  let text = newHtml.join('').matchAll(regex);
  let currentMatch = text.next();
  let currentMd;

  function findMatch(currentMd) {
    return Object.values(markdownMap).find(
      ([html, md, close]) => close === currentMd || md === currentMd
    );
  }
  let offset = 0;

  while (!text.done && currentMatch.value) {
    currentMd = currentMatch.value[0];
    let [html, opening, closing] = findMatch(currentMd);
    if (!opened.includes(closing)) {
      opened.push(closing);
      newHtml.splice(
        currentMatch.value.index + offset,
        currentMd.length,
        `<${html}>`
      );
      offset -= html.length + 2 - opening.length;
    } else {
      opened.splice(opened.lastIndexOf(closing), 1);
      newHtml.splice(
        currentMatch.value.index + offset,
        currentMd.length,
        `</${html}>`
      );
      offset -= html.length + 2 - closing.length;
    }
    currentMatch = text.next();
  }

  return newHtml.join('');
}
