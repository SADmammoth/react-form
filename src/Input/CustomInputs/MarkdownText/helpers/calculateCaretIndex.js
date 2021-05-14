import createChildrenArray from './createChildrenArray';

export default function calculateCaretIndex(input) {
  const { endOffset, endContainer } = window.getSelection().getRangeAt(0);
  const toLookUp = createChildrenArray(input);

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
