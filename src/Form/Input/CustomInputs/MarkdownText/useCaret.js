import { useReducer } from 'react';

let actionTypes = {
  input: 'input',
  set: 'set',
  backspace: 'backspace',
  delete: 'delete',
  left: 'left',
  right: 'right',
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
        textArray.splice(getIndex(text, index) + 1, 0, data);
        let newText = onTextChange(textArray.join(''));
        return {
          text: newText,
          index: index + newText.length - text.length + data.length,
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
          text: onTextChange(textArray).join(''),
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
