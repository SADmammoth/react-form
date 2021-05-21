import {
  input,
  newLine,
  backspace,
  deleteAction,
  left,
  right,
} from './caretHandlers';
import useCaret, { actionTypes, actions } from './useCaret';

const newActionTypes = {
  ...actionTypes,
  inputSelect: 'inputSelect',
  newLineSelect: 'newLineSelect',
  leftSelect: 'leftSelect',
  rightSelect: 'rightSelect',
  wrap: 'wrap',
  deleteSelect: 'deleteSelect',
  backspaceSelect: 'backspaceSelect',
};

export default function useSelection(
  init,
  onRangeChange = () => {},
  onIndexChange = () => {},
  getIndex = (text, i) => i,
  onTextChange = (text) => text
) {
  const [caretIndex, text, dispatch] = useCaret(
    init,
    onIndexChange,
    getIndex,
    onTextChange
  );

  const dispatchWrapper = ({ type, data }) => {
    switch (type) {
      case newActionTypes.inputSelect: {
        const { indexRange, input: inputData } = data;
        const cutText = cut(text, ...indexRange);
        const newIndex = indexRange[0];

        dispatch({ type: newActionTypes.set, data: cutText });
        dispatch({ type: newActionTypes.moveIndex, data: newIndex });
        dispatch({ type: newActionTypes.input, data: inputData });
        return;
      }

      case newActionTypes.newLineSelect: {
        const { indexRange, input: inputData } = data;
        const cutText = cut(text, ...indexRange);
        const newIndex = indexRange[0];

        dispatch({ type: newActionTypes.set, data: cutText });
        dispatch({ type: newActionTypes.moveIndex, data: newIndex });
        dispatch({ type: newActionTypes.newLine, data: inputData });
        return;
      }

      case newActionTypes.leftSelect: {
        const { indexRange } = data;
        dispatch({ type: newActionTypes.moveIndex, data: indexRange[0] });
        onRangeChange(...indexRange);
        return;
      }

      case newActionTypes.rightSelect: {
        const { indexRange } = data;
        dispatch({ type: newActionTypes.moveIndex, data: indexRange[1] });
        onRangeChange(...indexRange);
        return;
      }

      case newActionTypes.wrap: {
        const { indexRange, input: inputData } = data;
        const { text: newText, index: newIndex } = wrap(
          text,
          indexRange,
          inputData,
          getIndex,
          onTextChange,
          onIndexChange
        );

        dispatch({ type: newActionTypes.set, data: newText });
        dispatch({ type: newActionTypes.moveIndex, data: newIndex });
        return;
      }

      case newActionTypes.backspaceSelect:
      case newActionTypes.deleteSelect: {
        const { indexRange } = data;
        const cutText = cut(text, ...indexRange);
        const newIndex = indexRange[0];

        dispatch({ type: newActionTypes.set, data: cutText });
        dispatch({ type: newActionTypes.moveIndex, data: newIndex });
        return;
      }

      default: {
        dispatch({ type, data });
      }
    }
  };

  return [caretIndex, text, dispatchWrapper, newActionTypes];
}

function cut(text, from, to) {
  const textArray = text.split('');
  textArray.splice(from, to - from);
  return textArray.join('');
}

export function wrap(
  text,
  indexRange,
  data,
  getIndex,
  onTextChange,
  onIndexChange
) {
  let textArray = [...text];
  let from = getIndex(text, indexRange[0]);
  let to = getIndex(text, indexRange[1]);
  textArray.splice(
    from,
    to - from,
    data[0] + textArray.slice(from, to).join('') + data[1]
  );
  let newIndex = 0;

  onIndexChange(newIndex);

  return {
    text: textArray.join(''),
    index: newIndex,
  };
}

const newActions = {
  ...actions,
  inputSelect: (data) => ({ type: newActionTypes.inputSelect, data }),
  wrap: (data) => ({ type: newActionTypes.wrap, data }),
  leftSelect: (data) => ({ type: newActionTypes.leftSelect, data }),
  rightSelect: (data) => ({ type: newActionTypes.rightSelect, data }),
  newLineSelect: (data) => ({ type: newActionTypes.newLineSelect, data }),
  backspaceSelect: (data) => ({ type: newActionTypes.backspaceSelect, data }),
  deleteSelect: (data) => ({ type: newActionTypes.deleteSelect, data }),
};

export { newActions as actions, newActionTypes as actionTypes };
