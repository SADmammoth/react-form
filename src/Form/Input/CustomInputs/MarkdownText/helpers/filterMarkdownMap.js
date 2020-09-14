export default function filterMarkdownMap(
  markdownMap,
  specialButtons,
  markdownFeatures
) {
  let newMarkdownMap = {};
  let newSpecialButtons = {};
  let { headings, bold, italic, links } = markdownFeatures;
  if (markdownMap && headings) {
    newMarkdownMap.H1 = markdownMap.H1;
    newMarkdownMap.H2 = markdownMap.H2;
    newMarkdownMap.H3 = markdownMap.H3;
    newMarkdownMap.H4 = markdownMap.H4;
  }
  if (markdownMap && bold) {
    newMarkdownMap.Bold = markdownMap.Bold;
  }
  if (markdownMap && italic) {
    newMarkdownMap.Italic = markdownMap.Italic;
  }
  if (specialButtons && links) {
    newSpecialButtons.Link = specialButtons.Link;
  }

  return [newMarkdownMap, newSpecialButtons];
}
