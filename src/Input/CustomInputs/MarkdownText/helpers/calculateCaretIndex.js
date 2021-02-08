import createChildrenArray from './createChildrenArray';

export default function calculateCaretIndex(input) {
  let { endOffset, endContainer } = window.getSelection().getRangeAt(0);
  let toLookUp = createChildrenArray(input);

  let i = 0;
  for (let j = 0; j < toLookUp.length; j++) {
    if (toLookUp[j] === endContainer) {
      i += endOffset;
      break;
    }
    i += toLookUp[j].nodeValue.length;
  }

  return i;
}
