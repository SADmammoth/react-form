import React, { useState, useEffect, useMemo, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import TextArea from '../TextArea';
import Menu from '../Menu';
import markdownMap from './markdownMap';
import tagManager from './tagManager';
import useHtml from './useHtml';
import safeHtml from './safeHtml';

function MarkdownText({ value, onChange, name, onInput }) {
  let [html, setHtml] = useHtml(value);
  let [markdown, setMarkdown] = useState(value);
  //   let [opened, addOpened] = useReducer((state, data) => {
  //     return { ...state, data };
  //   });
  const input = useRef({});

  let onInputHandler = (event) => {
    if (event.key.length === 1) {
      event.preventDefault();
      setHtml(html + event.key);
      setMarkdown(value + event.key);
    }
    onInput({ target: { name, value: markdown } });
  };
  return (
    <div>
      <Menu
        commonButtonMode="trigger"
        buttons={Object.entries(markdownMap).map(([btnName, [tag, md]]) => ({
          content: btnName,
          on: () => {
            setHtml(
              tagManager.open(markdown, html, name, tag, md, '', setMarkdown)
            );
            onInput({ target: { name, value: markdown } });
            input.current.focus();
          },
          off: () => {
            setHtml(
              tagManager.close(markdown, html, name, tag, md, '', setMarkdown)
            );
            onInput({ target: { name, value: markdown } });
            input.current.focus();
          },
        }))}
      />

      <div
        ref={input}
        contentEditable={true}
        name={name}
        onKeyPress={onInputHandler}
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
