import React, {
  useEffect,
  useState,
  Fragment,
  useRef,
  useCallback,
} from 'react';

import _ from 'lodash';
import PropTypes from 'prop-types';

import getInputCaretIndex from '../../../Form/Input/CustomInputs/MarkdownText/helpers/getInputCaretIndex';
import keys from '../../../Form/Input/CustomInputs/MarkdownText/helpers/keys';
import setSelection from '../../../Form/Input/CustomInputs/MarkdownText/helpers/setSelection';
import createEvent from '../../../helpers/createEvent';
import setCaret from './helpers/setCaret';
import useSelection, {
  actions,
  actionTypes,
} from './helpers/useSelection/useSelection';

function CustomTextArea({
  id,
  value,
  onChange,
  name,
  onInput,
  markdownFeatures,
  editable,
}) {
  const input = useRef({});

  const [caretIndex, text, dispatch] = useSelection(
    value,
    (from, to) => setSelection(input.current, from, to),
    (index) => setCaret(input.current, index),
  );

  const onInputHandler = (event) => {
    if (event.altKey) {
      return;
    }

    if (event.ctrlKey) {
      return;
    }

    event.preventDefault();

    const isSelectionCollapsed = window.getSelection().getRangeAt(0).collapsed;

    if (!keys[event.key]) {
      isSelectionCollapsed
        ? dispatch(actions.input(event.key))
        : dispatch(
            actions.inputSelect({
              input: event.key,
              indexRange: getInputCaretIndex(input.current),
            }),
          );
      return;
    }
    if (event.key === keys.Backspace) {
      isSelectionCollapsed
        ? dispatch(actions.backspace())
        : dispatch(
            actions.backspaceSelect({
              indexRange: getInputCaretIndex(input.current),
            }),
          );
      return;
    }
    if (event.key === keys.Delete) {
      isSelectionCollapsed
        ? dispatch(actions.delete())
        : dispatch(
            actions.deleteSelect({
              indexRange: getInputCaretIndex(input.current),
            }),
          );
      return;
    }
    if (event.key === keys.ArrowLeft) {
      !event.shiftKey
        ? dispatch(actions.left())
        : dispatch(
            actions.leftSelect({
              indexRange: [
                getInputCaretIndex(input.current)[0] - 1,
                getInputCaretIndex(input.current)[1],
              ],
            }),
          );
      return;
    }
    if (event.key === keys.ArrowRight) {
      !event.shiftKey
        ? dispatch(actions.right())
        : dispatch(
            actions.rightSelect({
              indexRange: [
                getInputCaretIndex(input.current)[0],
                getInputCaretIndex(input.current)[1] + 1,
              ],
            }),
          );
      return;
    }
    if (event.key === keys.Insert) {
      dispatch(actions.insert());
      return;
    }
    if (event.key === keys.Enter) {
      isSelectionCollapsed
        ? dispatch(actions.newLine('\n'))
        : dispatch(
            actions.newLineSelect({
              input: '\n',
              indexRange: getInputCaretIndex(input.current),
            }),
          );
      return;
    }
  };

  const onClickHandler = (event) => {
    if (
      !_.isEmpty(input.current) &&
      window.getSelection().getRangeAt(0).collapsed
    ) {
      let index = getInputCaretIndex(input.current)[0];
      dispatch(actions.moveIndex(index));
    }
  };

  const onPasteHandler = (event) => {
    const isSelectionCollapsed = window.getSelection().getRangeAt(0).collapsed;
    const pasteData = event.clipboardData.getData('text/plain');
    isSelectionCollapsed
      ? dispatch(actions.input(pasteData))
      : dispatch(
          actions.inputSelect({
            input: pasteData,
            indexRange: getInputCaretIndex(input.current),
          }),
        );
    event.preventDefault();
  };

  const onCutHandler = (event) => {
    const isSelectionCollapsed = window.getSelection().getRangeAt(0).collapsed;
    if (!isSelectionCollapsed) {
      const indexRange = getInputCaretIndex(input.current);
      dispatch(
        actions.deleteSelect({
          indexRange,
        }),
      );
      event.clipboardData.setData(
        'text/plain',
        text.substr(indexRange[0], indexRange[1] - indexRange[0]),
      );
    }

    event.preventDefault();
  };

  useEffect(() => {
    onChange(createEvent(name, text));
    setCaret(input.current, caretIndex);
  }, [text]);

  return (
    <>
      <pre
        id={id}
        ref={input}
        contentEditable={true}
        onKeyDown={onInputHandler}
        onClick={onClickHandler}
        className="markdown-text-input"
        suppressContentEditableWarning={true}
        style={{ whiteSpace: 'pre-wrap' }}
        dangerouslySetInnerHTML={{ __html: text }}
        onPaste={onPasteHandler}
        onCut={onCutHandler}></pre>
      <input type="hidden" name={name} value={text} />
    </>
  );
}

CustomTextArea.propTypes = {};

export default CustomTextArea;
