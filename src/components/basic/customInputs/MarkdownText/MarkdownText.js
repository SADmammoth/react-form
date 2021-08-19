import React, { useState, useEffect, useRef, useMemo, Fragment } from 'react';

import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import MarkdownOutput from './MarkdownOutput';
import calculateCaretIndex from './helpers/calculateCaretIndex';
import createMdShortcutsButtons from './helpers/createMdShortcutsButtons';
import filterMarkdownMap from './helpers/filterMarkdownMap';
import getHtmlIndex from './helpers/indexHelpers/getHtmlIndex';
import getMarkdownIndex from './helpers/indexHelpers/getMarkdownIndex';
import isMarkdownElement from './helpers/isMarkdownElement';
import markdownMap, { specialButtons } from './helpers/markdownMap';
import setCaret from './helpers/setCaret';
import shortcutMd from './helpers/shortcutMd';
import useCaret, { actionTypes } from './useCaret';
import useMd from './useOTGMdShortcuts';
import Menu from '@/generic/Menu';
import TriggerButton from '@/generic/TriggerButton';
import compareObjects from '@/helpers/compareObjects';

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

  const [filteredMarkdownMap] = filterMarkdownMap(
    markdownMap,
    undefined,
    markdownFeatures,
  );

  const update = useMd(filteredMarkdownMap);

  const [htmlI, html, htmlDispatch] = useCaret(
    shortcutMd(value, filteredMarkdownMap),
    getHtmlIndex,
    update,
  );

  function getMdIndex(text, index) {
    return getMarkdownIndex(text, index, filteredMarkdownMap);
  }

  const [mdI, markdown, mdDispatch] = useCaret(value, getMdIndex);
  const [portals, setPortals] = useState({});

  const [showNotPrintable, setShowNotPrintable] = useState(false);

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

  const dispatchBoth = (args) => {
    htmlDispatch(args);
    mdDispatch(args);
  };

  const onInputHandler = (event) => {
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

  const onMouseClick = (event) => {
    if (isMarkdownElement(event.target)) {
      const i = calculateCaretIndex(input.current);
      htmlDispatch({ type: actionTypes.moveIndex, data: i });
      mdDispatch({ type: actionTypes.moveIndex, data: i });
    }
  };

  const [, filteredSpecialButtons] = filterMarkdownMap(
    undefined,
    specialButtons(
      htmlDispatch,
      htmlI,
      mdDispatch,
      actionTypes,
      portals,
      setPortals,
    ),
    markdownFeatures,
  );

  const buttons = useMemo(
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
        filteredMarkdownMap,
      ),
    [onInput],
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
        }}>
        Show not printable
      </TriggerButton>
      <div
        className={`markdown-text-input${
          showNotPrintable ? ' show-not-printable' : ''
        }`}
        ref={input}
        contentEditable
        name={name}
        onKeyDown={onInputHandler}
        onBlur={() => {
          onChange({ target: { name, value: markdown } });
        }}
        onClick={onMouseClick}
        dangerouslySetInnerHTML={{ __html: html }}
      />
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
