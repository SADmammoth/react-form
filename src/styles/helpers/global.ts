import { css, Theme } from '@emotion/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSSInterpolation } from '@emotion/serialize';
import emotionNormalize from 'emotion-normalize';

const global = (theme: Theme): CSSInterpolation => css`
  ${emotionNormalize}

  * {
    font-family: ${theme.typography.fontFamily};
  }

  .block_text_selection,
  .block_text_selection * {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }
`;

export default global;
