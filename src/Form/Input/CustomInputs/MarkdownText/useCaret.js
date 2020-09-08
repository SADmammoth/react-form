import { useReducer } from 'react';
import calcLength from './calcLength';

let actionTypes = {
  input: 'input',
  newLine: 'new_line',
  set: 'set',
  backspace: 'backspace',
  delete: 'delete',
  left: 'left',
  right: 'right',
  wrap: 'wrap',
};

export default function useCaret(
  init,
  getIndex,
  onTextChange = (text) => text
) {
  let reducer = (state, { type, data }) => {
    let { text, index } = state;
    switch (type) {
      case actionTypes.input: {
        let textArray = [...text];
        console.log(index);
        let realIndex = getIndex(text, index);
        textArray.splice(realIndex, 0, data);
        console.log(0);
        console.log(textArray, textArray.slice(0, realIndex + data.length));
        let newText =
          onTextChange(textArray.slice(0, realIndex).join('')) +
          textArray.slice(realIndex).join('');
        console.log(newText);
        let newIndex = index + data.length;
        if (newText !== textArray.join('')) {
          console.log(calcLength(newText));
          newIndex = calcLength(newText);
        }
        return {
          text: newText,
          index: newIndex,
        };
      }
      case actionTypes.newLine: {
        let textArray = [...text];
        textArray.splice(getIndex(text, index) + 1, 0, data);
        let newText = onTextChange(textArray.join(''));
        return {
          text: newText,
          index: index + 1,
        };
      }
      case actionTypes.wrap: {
        let textArray = [...text];
        let from = getIndex(text, data.from);
        let to = getIndex(text, data.to);
        console.log(to);
        textArray.splice(
          from,
          to - from,
          data.leftWrap + textArray.slice(from, to).join('') + data.rightWrap
        );

        return {
          text: textArray.join(''),
          index: 0,
        };
      }
      case actionTypes.set: {
        return { text: onTextChange(data), index: data.length };
      }
      case actionTypes.backspace: {
        if (index <= 0) {
          return state;
        }
        let textArray = [...text];
        textArray.splice(getIndex(text, index - 1), 1);

        return {
          text: onTextChange(textArray),
          index: index - 1,
        };
      }
      case actionTypes.delete: {
        if (index > text.length - 1) {
          return state;
        }
        let textArray = [...text];
        textArray.splice(getIndex(text, index), 1);
        return {
          text: onTextChange(textArray.join('')),
          index,
        };
      }
      case actionTypes.left: {
        if (index <= 0) {
          return state;
        }
        return { text, index: index - 1 };
      }
      case actionTypes.right: {
        if (index > text.length - 1) {
          return state;
        }
        return { text, index: index + 1 };
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

export { actionTypes };
