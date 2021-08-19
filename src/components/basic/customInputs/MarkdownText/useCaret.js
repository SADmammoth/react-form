import { useReducer } from 'react';

import calcLength from './helpers/indexHelpers/calcLength';
import toArray from '@/helpers/toArray';

const actionTypes = {
  input: 'input',
  newLine: 'new_line',
  set: 'set',
  backspace: 'backspace',
  delete: 'delete',
  left: 'left',
  right: 'right',
  wrap: 'wrap',
  moveIndex: 'move_index',
};

export default function useCaret(
  init,
  getIndex,
  onTextChange = (text) => text,
) {
  const reducer = (state, { type, data }) => {
    const { text, index } = state;

    switch (type) {
      case actionTypes.input: {
        return input(text, index, data, getIndex, onTextChange);
      }

      case actionTypes.newLine: {
        return newLine(text, index, data, getIndex, onTextChange);
      }

      case actionTypes.wrap: {
        return wrap(text, index, data, getIndex, onTextChange);
      }

      case actionTypes.set: {
        return { text: onTextChange(data), index: data.length };
      }

      case actionTypes.backspace: {
        return backspace(text, index, data, getIndex, onTextChange);
      }

      case actionTypes.delete: {
        return deleteAction(text, index, data, getIndex, onTextChange);
      }

      case actionTypes.left: {
        return left(text, index, data, getIndex, onTextChange);
      }

      case actionTypes.right: {
        return right(text, index, data, getIndex, onTextChange);
      }

      case actionTypes.moveIndex: {
        return { text, index: data };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    text: init,
    index: init.length && init.length - 1,
  });

  return [state.index, state.text, dispatch, actionTypes];
}

function input(text, index, data, getIndex, onTextChange) {
  const textArray = toArray(text);
  const realIndex = getIndex(text, index);
  textArray.splice(realIndex, 0, data);
  const newText =
    onTextChange(textArray.slice(0, realIndex + 1).join('')) +
    textArray.slice(realIndex + 1, -1).join('');

  let newIndex = index + data.length;
  if (newText !== textArray.join('')) {
    newIndex = calcLength(newText);
  }
  return {
    text: newText,
    index: newIndex,
  };
}

function newLine(text, index, data, getIndex, onTextChange) {
  const textArray = toArray(text);
  textArray.splice(getIndex(text, index) + 1, 0, data);
  const newText = onTextChange(textArray.join(''));

  return {
    text: newText,
    index: index + 1,
  };
}

function wrap(text, index, data, getIndex, onTextChange) {
  const textArray = toArray(text);
  const from = getIndex(text, data.from);
  const to = getIndex(text, data.to);
  textArray.splice(
    from,
    to - from,
    data.leftWrap + textArray.slice(from, to).join('') + data.rightWrap,
  );

  return {
    text: textArray.join(''),
    index: 0,
  };
}

function backspace(text, index, data, getIndex, onTextChange) {
  if (index <= 0) {
    return { text, index };
  }
  const textArray = toArray(text);
  textArray.splice(getIndex(text, index - 1), 1);

  return {
    text: onTextChange(textArray),
    index: index - 1,
  };
}

function deleteAction(text, index, data, getIndex, onTextChange) {
  if (index > text.length - 1) {
    return { text, index };
  }
  const textArray = toArray(text);
  textArray.splice(getIndex(text, index), 1);

  return {
    text: onTextChange(textArray.join('')),
    index,
  };
}

function left(text, index, data, getIndex, onTextChange) {
  if (index <= 0) {
    return { text, index };
  }

  return { text, index: index - 1 };
}

function right(text, index, data, getIndex, onTextChange) {
  if (index > text.length - 1) {
    // return state;
  }

  return { text, index: index + 1 };
}

export { actionTypes };
