import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import markdownMap from './Input/CustomInputs/MarkdownText/helpers/markdownMap';
import getHtmlIndex from './Input/CustomInputs/MarkdownText/helpers/indexHelpers/getHtmlIndex';
import getMarkdownIndex from './Input/CustomInputs/MarkdownText/helpers/indexHelpers/getMarkdownIndex';
import useCaret from './Input/CustomInputs/MarkdownText/useCaret';
import useMd from './Input/CustomInputs/MarkdownText/useOTGMdShortcuts';
import compareObjects from '../helpers/compareObjects';
import filterMarkdownMap from './Input/CustomInputs/MarkdownText/helpers/filterMarkdownMap';
import shortcutMd from './Input/CustomInputs/MarkdownText/helpers/shortcutMd';

function MarkdownOutput({ id, value, name, markdownFeatures }) {
  let [filteredMarkdownMap] = filterMarkdownMap(
    markdownMap,
    undefined,
    markdownFeatures
  );

  let update = useMd(filteredMarkdownMap);

  let [, html, htmlDispatch] = useCaret(
    shortcutMd(value, filteredMarkdownMap),
    getHtmlIndex,
    update
  );

  function getMdIndex(text, index) {
    return getMarkdownIndex(text, index, filteredMarkdownMap);
  }

  let [, markdown, mdDispatch] = useCaret(value, getMdIndex);

  useEffect(() => {
    if (value !== markdown) {
      console.log(value);
      mdDispatch({ type: 'set', data: value });
      htmlDispatch({
        type: 'set',
        data: shortcutMd(value, filteredMarkdownMap),
      });
    }
  });

  return (
    <div className="markdown-text">
      <div
        id={id}
        className="markdown-text-output"
        contentEditable={false}
        name={name}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}

MarkdownOutput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.string,
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
};

MarkdownOutput.defaultProps = {
  markdownFeatures: { bold: true, italic: true },
};

export default React.memo(MarkdownOutput, compareObjects);
