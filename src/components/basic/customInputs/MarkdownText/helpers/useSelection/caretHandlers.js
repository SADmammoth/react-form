export function input(
  text,
  index,
  data,
  getIndex,
  onTextChange,
  onIndexChange,
  insertMode = false
) {
  let textArray = [...text];

  let realIndex = getIndex(text, index);
  textArray.splice(realIndex, 0, data);

  let changedText = onTextChange(textArray.slice(0, realIndex + 1).join(''));

  const indexOffset = insertMode ? 2 : 1;

  let newText =
    changedText +
    textArray.slice(realIndex + indexOffset, textArray.length).join('');

  let newIndex = index + data.length;
  if (newText !== textArray.join('')) {
    newIndex = calcLength(changedText);
  }

  onIndexChange(newIndex);

  return {
    text: newText,
    index: newIndex,
  };
}

export function newLine(
  text,
  index,
  data,
  getIndex,
  onTextChange,
  onIndexChange
) {
  let textArray = [...text];
  textArray.splice(getIndex(text, index), 0, data);
  let newText = onTextChange(textArray.join(''));
  let newIndex = index + 1;

  onIndexChange(newIndex);

  return {
    text: newText,
    index: newIndex,
  };
}

export function backspace(
  text,
  index,
  data,
  getIndex,
  onTextChange,
  onIndexChange
) {
  if (index <= 0) {
    return { text, index };
  }
  let textArray = [...text];
  textArray.splice(getIndex(text, index - 1), 1);
  let newIndex = index - 1;

  onIndexChange(index);

  return {
    text: onTextChange(textArray.join('')),
    index: newIndex,
  };
}

export function deleteAction(
  text,
  index,
  data,
  getIndex,
  onTextChange,
  onIndexChange
) {
  if (index > text.length - 1) {
    return { text, index };
  }
  let textArray = [...text];
  textArray.splice(getIndex(text, index), 1);

  onIndexChange(index);

  return {
    text: onTextChange(textArray.join('')),
    index,
  };
}

export function left(text, index, data, getIndex, onTextChange, onIndexChange) {
  if (index <= 0) {
    return { text, index };
  }

  let newIndex = index - 1;
  onIndexChange(newIndex);

  return { text, index: newIndex };
}

export function right(
  text,
  index,
  data,
  getIndex,
  onTextChange,
  onIndexChange
) {
  if (index > text.length - 1) {
    return state;
  }

  let newIndex = index + 1;
  onIndexChange(newIndex);

  return { text, index: newIndex };
}
