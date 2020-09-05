import React, { useState, useEffect, useMemo, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import TextArea from '../TextArea';
import Menu from '../Menu';
import markdownMap from './markdownMap';
import tagManager from './tagManager';
import useHtml from './useHtml';
import safeHtml from './safeHtml';
import getHtmlIndex from './getHtmlIndex';
import getMarkdownIndex from './getMarkdownIndex';
import useCaret, { actionTypes } from './useCaret';
// import shortcutMd from './shortcutMd';
import useMd from './useMd';

function MarkdownText({ value, onChange, name, onInput }) {
  let update = useMd();
  let [htmlI, html, htmlDispatch] = useCaret(value, getHtmlIndex, update);
  let [mdI, markdown, mdDispatch] = useCaret(value, getMarkdownIndex);

  useEffect(() => {
    function setIndex(node, charsCount) {
      let range;
      let selection = window.getSelection();
      function recurse(node, charsCount, rang) {
        range = rang;
        if (!rang) {
          range = document.createRange();
          range.selectNode(node);
          range.setStart(node, 0);
        }
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent.length < charsCount) {
            charsCount -= node.textContent.length;
          } else {
            range.setEnd(node, charsCount);
            charsCount = 0;
          }
        }
        for (var lp = 0; lp < node.childNodes.length; lp++) {
          range = recurse(node.childNodes[lp], charsCount, range);

          if (charsCount === 0) {
            break;
          }
        }
        return range;
      }
      recurse(node, charsCount);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    setIndex(input.current, htmlI);
  }, [htmlI, html]);

  const input = useRef({});

  let onInputHandler = (event) => {
    event.preventDefault();
    if (event.key === 'Backspace') {
      htmlDispatch({ type: actionTypes.backspace });
      mdDispatch({ type: actionTypes.backspace });
    }
    if (event.key === 'ArrowLeft') {
      htmlDispatch({ type: actionTypes.left });
      mdDispatch({ type: actionTypes.left });
    }
    if (event.key === 'ArrowRight') {
      htmlDispatch({ type: actionTypes.right });
      mdDispatch({ type: actionTypes.right });
    }
    if (event.key === 'Delete') {
      htmlDispatch({ type: actionTypes.delete });
      mdDispatch({ type: actionTypes.delete });
    }
    if (event.key.length === 1) {
      console.log(shortcutMd(html));
      htmlDispatch({ type: actionTypes.input, data: event.key });
      mdDispatch({ type: actionTypes.input, data: event.key });
    }
    onInput({ target: { name, value: markdown } });
  };
  return (
    <div className="markdown-text">
      <Menu
        commonButtonMode="trigger"
        buttons={Object.entries(markdownMap).map(
          ([btnName, [tag, md, mdClose]]) => ({
            key: btnName,
            content: btnName,
            on: () => {
              htmlDispatch({
                type: actionTypes.set,
                data: tagManager.open(
                  markdown,
                  html,
                  name,
                  tag,
                  md,
                  '',
                  (data) => {
                    htmlDispatch({ type: actionTypes.input, data });
                  }
                ),
              });
              onInput({ target: { name, value: markdown } });
              input.current.focus();
            },
            off: () => {
              htmlDispatch({
                type: actionTypes.set,
                data: tagManager.open(
                  markdown,
                  html,
                  name,
                  tag,
                  mdClose,
                  '',
                  (data) => {
                    htmlDispatch({ type: actionTypes.input, data });
                  }
                ),
              });

              onInput({ target: { name, value: markdown } });
              input.current.focus();
            },
          })
        )}
      />

      <div
        className="markdown-text-input"
        ref={input}
        contentEditable={true}
        name={name}
        onKeyDown={onInputHandler}
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
  onError: PropTypes.func.isRequired,
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

export default MarkdownText;
