import createChildrenArray from './createChildrenArray';

export default function setCaret(input, caretIndex) {
  let range;
  const selection = window.getSelection();
  const toLookUp = createChildrenArray(input);

  function setRange(node, index) {
    range = document.createRange();
    range.selectNode(node);
    range.setStart(node, 0);
    range.setEnd(node, index);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  let i = 0;
  let j;
  for (j = 0; j < toLookUp.length; j++) {
    if (i + toLookUp[j].nodeValue.length + j >= caretIndex) {
      setRange(toLookUp[j], caretIndex - i - j);
      break;
    }
    i += toLookUp[j].nodeValue.length;
  }

  if (toLookUp.length && j === toLookUp.length) {
    setRange(
      toLookUp[toLookUp.length - 1],
      toLookUp[toLookUp.length - 1].length,
    );
  }
}
