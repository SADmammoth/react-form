export default function isMarkdownElement(element) {
  return !element.matches('*[data-input="true"], *[data-input="true"] *');
}
