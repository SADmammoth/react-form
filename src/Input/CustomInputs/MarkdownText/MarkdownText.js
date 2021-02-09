import React, { useState, useEffect, useRef, useMemo, Fragment } from 'react';
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
import TriggerButton from '../TriggerButton';
import compareObjects from '../../../helpers/compareObjects';
import filterMarkdownMap from './helpers/filterMarkdownMap';
import shortcutMd from './helpers/shortcutMd';
import MarkdownOutput from './MarkdownOutput';

function MarkdownText({
  id,
  value,
  onChange,
  name,
  onInput,
  markdownFeatures,
  editable,
}) {
  if (!editable) {
    return (
      <MarkdownOutput
        id={id}
        name={name}
        value={value}
        markdownFeatures={markdownFeatures}
      />
    );
  }

  const input = useRef({});

  let [filteredMarkdownMap] = filterMarkdownMap(
    markdownMap,
    undefined,
    markdownFeatures
  );

  let update = useMd(filteredMarkdownMap);

  let [htmlI, html, htmlDispatch] = useCaret(
    shortcutMd(value, filteredMarkdownMap),
    getHtmlIndex,
    update
  );

  function getMdIndex(text, index) {
    return getMarkdownIndex(text, index, filteredMarkdownMap);
  }

  let [mdI, markdown, mdDispatch] = useCaret(value, getMdIndex);
  let [portals, setPortals] = useState({});

  let [showNotPrintable, setShowNotPrintable] = useState(false);

  useEffect(() => {
    if (Object.entries(portals).length) {
      Object.entries(portals).forEach(([id, component]) => {
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

  let [, filteredSpecialButtons] = filterMarkdownMap(
    undefined,
    specialButtons(
      htmlDispatch,
      htmlI,
      mdDispatch,
      actionTypes,
      portals,
      setPortals
    ),
    markdownFeatures
  );

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
        filteredSpecialButtons,
        filteredMarkdownMap
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
        onBlur={() => {
          console.log(markdown);
          onChange({ target: { name, value: markdown } });
        }}
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
    // lists: PropTypes.bool,
    // images: PropTypes.bool,
    // quotes: PropTypes.bool,
    // code: PropTypes.bool,
    // todo: PropTypes.bool,
    // tables: PropTypes.bool,
  }),
  editable: PropTypes.bool,
};
MarkdownText.defaultProps = {
  markdownFeatures: { bold: true, italic: true },
  editable: true,
};

export default React.memo(MarkdownText, compareObjects);
