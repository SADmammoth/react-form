import React, { useState, useEffect, useMemo, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
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
import Link from './Link';
import Button from '../Button';

function MarkdownText({ value, onChange, name, onInput }) {
  let update = useMd();
  const input = useRef({});
  let [htmlI, html, htmlDispatch] = useCaret(value, getHtmlIndex, update);
  let [mdI, markdown, mdDispatch] = useCaret(value, getMarkdownIndex);
  let [portals, setPortals] = useState({});

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
    let range;
    let selection = window.getSelection();
    let toLookUp = [];
    function rec(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        toLookUp.push(node);
      } else {
        node.childNodes.forEach((child) => rec(child));
      }
    }

    rec(input.current);

    function setRange(node, index) {
      console.log('sfsf', index);
      range = document.createRange();
      range.selectNode(node);
      range.setStart(node, 0);
      range.setEnd(node, index);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    console.log(toLookUp);
    let i = 0;
    let j;
    for (j = 0; j < toLookUp.length; j++) {
      console.log(i, i + toLookUp[j].nodeValue.length, htmlI, j - 1);
      console.log(toLookUp[j].nodeValue, i, j, htmlI);

      if (i + toLookUp[j].nodeValue.length + j >= htmlI) {
        setRange(toLookUp[j], htmlI - i - j);
        break;
      }
      i += toLookUp[j].nodeValue.length;
    }

    if (toLookUp.length && j === toLookUp.length) {
      setRange(
        toLookUp[toLookUp.length - 1],
        toLookUp[toLookUp.length - 1].length
      );
    }
  }, [htmlI, html]);

  let onInputHandler = (event) => {
    console.log(!event.target.matches('*[data-input="true"] *'));
    if (!event.target.matches('*[data-input="true"], *[data-input="true"] *')) {
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
      if (event.key === 'Enter') {
        htmlDispatch({ type: actionTypes.newLine, data: '  ' });
        mdDispatch({ type: actionTypes.newLine, data: '<br/>' });
      }
      if (event.key.length === 1 || event.key === 'Space') {
        htmlDispatch({ type: actionTypes.input, data: event.key });
        mdDispatch({ type: actionTypes.input, data: event.key });
      }
      onInput({ target: { name, value: markdown } }, () => {
        input.current.focus();
      });
    }
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
              let { endOffset, startOffset } = window
                .getSelection()
                .getRangeAt(0);
              if (endOffset === startOffset) {
                htmlDispatch({ type: actionTypes.input, data: md });
                mdDispatch({ type: actionTypes.input, data: md });
              } else {
                htmlDispatch({
                  type: actionTypes.wrap,
                  data: {
                    from: startOffset,
                    to: endOffset,
                    leftWrap: `<${tag}>`,
                    rightWrap: `</${tag}>`,
                  },
                });
                mdDispatch({
                  type: actionTypes.wrap,
                  data: {
                    from: startOffset,
                    to: endOffset,
                    leftWrap: md,
                    rightWrap: mdClose,
                  },
                });
              }

              onInput({ target: { name, value: markdown } });
              input.current.focus();
            },
            off: () => {
              htmlDispatch({ type: actionTypes.input, data: mdClose });
              mdDispatch({ type: actionTypes.input, data: mdClose });
              onInput({ target: { name, value: markdown } });
              input.current.focus();
            },
          })
        )}
      />
      <Button
        type="button"
        onClick={() => {
          htmlDispatch({
            type: actionTypes.input,
            data: `<div id='link-${htmlI}'></div>`,
          });
          console.log(markdown);
          setPortals({
            ...portals,
            [`link-${htmlI}`]: (
              <Link
                setMd={(md) => {
                  mdDispatch({
                    type: actionTypes.input,
                    data: md,
                  });
                }}
              ></Link>
            ),
          });
        }}
      >
        Link
      </Button>

      <div
        className="markdown-text-input"
        ref={input}
        contentEditable={true}
        name={name}
        onKeyDown={onInputHandler}
        onClick={(event) => {
          console.log(
            !event.target.matches(
              '*[data-input="true"], *[data-input="true"] *'
            )
          );
          if (
            !event.target.matches(
              '*[data-input="true"], *[data-input="true"] *'
            )
          ) {
            let { endOffset, endContainer } = window
              .getSelection()
              .getRangeAt(0);
            let toLookUp = [];
            function rec(node) {
              if (node.nodeType === Node.TEXT_NODE) {
                toLookUp.push(node);
              } else {
                node.childNodes.forEach((child) => rec(child));
              }
            }

            rec(input.current);
            let i = 0;
            console.log(endContainer, toLookUp);
            for (let j = 0; j < toLookUp.length; j++) {
              console.log(toLookUp[j] === endContainer);
              if (toLookUp[j] === endContainer) {
                i += endOffset;
                break;
              }
              i += toLookUp[j].nodeValue.length;
            }

            htmlDispatch({ type: actionTypes.moveIndex, data: i });
            mdDispatch({ type: actionTypes.moveIndex, data: i });
          }
        }}
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

export default MarkdownText;
