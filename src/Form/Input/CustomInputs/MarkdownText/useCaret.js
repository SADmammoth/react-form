import { useReducer } from 'react';

let actionTypes = {
  input: 'input',
  set: 'set',
  backspace: 'backspace',
  delete: 'delete',
  left: 'left',
  right: 'right',
};

export default function useCaret(init, getIndex) {
  let reducer = (state, { type, data }) => {
    let { text, index } = state;
    switch (type) {
      case actionTypes.input: {
        console.log(data);
        let textArray = [...text];
        textArray.splice(getIndex(text, index), 0, data);
        return {
          text: textArray.join(''),
          index: index + data.length,
        };
      }
      case actionTypes.set: {
        console.log(data);
        return { text: data, index: data.length };
      }
      case actionTypes.backspace: {
        console.log(index);
        if (index <= 0) {
          return state;
        }
        let textArray = [...text];
        textArray.splice(getIndex(text, index - 1), 1);

        return {
          text: textArray.join(''),
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
          text: textArray.join(''),
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
