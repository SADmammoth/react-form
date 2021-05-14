import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import compareObjects from '../../../helpers/compareObjects';
import filterMarkdownMap from './helpers/filterMarkdownMap';
import markdownMap from './helpers/markdownMap';
import shortcutMd from './helpers/shortcutMd';

function MarkdownOutput({ id, value, name, markdownFeatures }) {
  const [filteredMarkdownMap] = filterMarkdownMap(
    markdownMap,
    undefined,
    markdownFeatures,
  );

  // let update = useMd(filteredMarkdownMap);

  const [html, setHtml] = useState(shortcutMd(value, filteredMarkdownMap));

  const [markdown, setMarkdown] = useState(value);

  useEffect(() => {
    if (value !== markdown) {
      setMarkdown(value);
      setHtml(shortcutMd(value, filteredMarkdownMap));
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
      />
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
