import { useReducer } from 'react';
import {
  input,
  newLine,
  backspace,
  deleteAction,
  left,
  right,
} from './caretHandlers';

const actionTypes = {
  input: 'input',
  newLine: 'new_line',
  set: 'set',
  backspace: 'backspace',
  delete: 'delete',
  left: 'left',
  right: 'right',
  moveIndex: 'move_index',
  insert: 'insert',
};

/**
 * Hook, allows to manage input and move caret for inputs with custom indexation
 * @function useCaret
 * @param  {string} init Initial text value
 * @param  {(index: number)=>void} onIndexChange Callback, performs action on index change
 * @param  {(text: string, actualIndex: number)=>number} getIndex Provides text indexation based on actual index
 * @param  {(actualText: string)=>string} onTextChange Callback, processes text before saving to state
 *
 */
export default function useCaret(
  init,
  onIndexChange = () => {},
  getIndex = (text, i) => i,

  onTextChange = (text) => text
) {
  let reducer = (state, { type, data }) => {
    let { text, index, insert } = state;

    switch (type) {
      case actionTypes.insert: {
        return { ...state, insert: !insert };
      }
      case actionTypes.input: {
        return {
          ...state,
          ...input(
            text,
            index,
            data,
            getIndex,
            onTextChange,
            onIndexChange,
            insert
          ),
        };
      }

      case actionTypes.newLine: {
        return {
          ...state,
          ...newLine(text, index, data, getIndex, onTextChange, onIndexChange),
        };
      }

      case actionTypes.set: {
        return { ...state, text: onTextChange(data), index: data.length };
      }

      case actionTypes.backspace: {
        return {
          ...state,
          ...backspace(
            text,
            index,
            data,
            getIndex,
            onTextChange,
            onIndexChange
          ),
        };
      }

      case actionTypes.delete: {
        return {
          ...state,
          ...deleteAction(
            text,
            index,
            data,
            getIndex,
            onTextChange,
            onIndexChange
          ),
        };
      }

      case actionTypes.left: {
        return {
          ...state,
          ...left(text, index, data, getIndex, onTextChange, onIndexChange),
        };
      }

      case actionTypes.right: {
        return {
          ...state,
          ...right(text, index, data, getIndex, onTextChange, onIndexChange),
        };
      }

      case actionTypes.moveIndex: {
        return { ...state, text, index: data };
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

const actions = {
  input: (data) => ({ type: actionTypes.input, data }),
  newLine: (data) => ({ type: actionTypes.newLine, data }),
  set: (data) => ({ type: actionTypes.set, data }),
  backspace: () => ({ type: actionTypes.backspace }),
  delete: () => ({ type: actionTypes.delete }),
  left: () => ({ type: actionTypes.left }),
  right: () => ({ type: actionTypes.right }),
  moveIndex: (data) => ({ type: actionTypes.moveIndex, data }),
  insert: () => ({ type: actionTypes.insert }),
};

export { actionTypes, actions };
