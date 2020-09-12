import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Menu from '../Menu';
import markdownMap, { specialButtons } from './helpers/markdownMap';
import getHtmlIndex from './helpers/indexHelpers/getHtmlIndex';
import getMarkdownIndex from './helpers/indexHelpers/getMarkdownIndex';
import useCaret, { actionTypes } from './useCaret';
import useMd from './useOTGMdShortcuts';
import isMarkdownElement from './helpers/isMarkdownElement';
import createMdShortcutsButtons from './helpers/createMdShortcutsButtons';
import setCaret from './helpers/setCaret';
import calculateCaretIndex from './helpers/calculateCaretIndex';
import CheckboxGroup from '../CheckboxGroup';
import Form from '../../../Form';
import TriggerButton from '../TriggerButton';
import compareObjects from '../../../../helpers/compareObjects';

function MarkdownText({ value, onChange, name, onInput }) {
  let update = useMd();
  const input = useRef({});
  let [htmlI, html, htmlDispatch] = useCaret(value, getHtmlIndex, update);
  let [mdI, markdown, mdDispatch] = useCaret(value, getMarkdownIndex);
  let [portals, setPortals] = useState({});

  let [showNotPrintable, setShowNotPrintable] = useState(false);

  useEffect(() => {
    if (Object.entries(portals).length) {
      Object.entries(portals).forEach(([id, component]) => {
        console.log(id, document.getElementById(id), component);
        ReactDOM.render(component, document.getElementById(id));
      });
      setPortals({});
    }
  }, [portals]);

  useEffect(() => {
    setCaret(input.current, htmlI);
  }, [htmlI, html]);

  let dispatchBoth = (args) => {
    htmlDispatch(args);
    mdDispatch(args);
  };

  let onInputHandler = (event) => {
    if (isMarkdownElement(event.target)) {
      event.preventDefault();
      if (event.key === 'Backspace') {
        dispatchBoth({ type: actionTypes.backspace });
      }
      if (event.key === 'ArrowLeft') {
        dispatchBoth({ type: actionTypes.left });
      }
      if (event.key === 'ArrowRight') {
        dispatchBoth({ type: actionTypes.right });
      }
      if (event.key === 'Delete') {
        dispatchBoth({ type: actionTypes.delete });
      }
      if (event.key === 'Enter') {
        htmlDispatch({ type: actionTypes.newLine, data: '  ' });
        mdDispatch({ type: actionTypes.newLine, data: '<br/>' });
      }
      if (event.key.length === 1 || event.key === 'Space') {
        dispatchBoth({ type: actionTypes.input, data: event.key });
      }
      onInput({ target: { name, value: markdown } });
    }
  };

  let onMouseClick = (event) => {
    if (isMarkdownElement(event.target)) {
      let i = calculateCaretIndex(input.current);
      htmlDispatch({ type: actionTypes.moveIndex, data: i });
      mdDispatch({ type: actionTypes.moveIndex, data: i });
    }
  };

  let buttons = useMemo(
    () =>
      createMdShortcutsButtons(
        htmlDispatch,
        mdDispatch,
        actionTypes,
        () => {
          onInput({ target: { name, value: markdown } });
          input.current.focus();
        },
        specialButtons(
          htmlDispatch,
          htmlI,
          mdDispatch,
          actionTypes,
          portals,
          setPortals
        )
      ),
    [onInput]
  );

  return (
    <div className="markdown-text">
      <Menu buttons={buttons} />
      <TriggerButton
        on={() => {
          setShowNotPrintable(true);
        }}
        off={() => {
          setShowNotPrintable(false);
        }}
      >
        Show not printable
      </TriggerButton>
      <div
        className={`markdown-text-input${
          showNotPrintable ? ' show-not-printable' : ''
        }`}
        ref={input}
        contentEditable={true}
        name={name}
        onKeyDown={onInputHandler}
        onClick={onMouseClick}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}

MarkdownText.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  attributes: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string,
  minSymbols: PropTypes.number,
  maxSymbols: PropTypes.number,
  onError: PropTypes.func,
  markdownFeatures: PropTypes.shape({
    headings: PropTypes.bool,
    links: PropTypes.bool,
    bold: PropTypes.bool,
    italic: PropTypes.bool,
    lists: PropTypes.bool,
    images: PropTypes.bool,
    quotes: PropTypes.bool,
    code: PropTypes.bool,
    todo: PropTypes.bool,
    tables: PropTypes.bool,
  }),
};

export default React.memo(MarkdownText, compareObjects);
