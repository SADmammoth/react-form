import { css, Theme } from '@emotion/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSSInterpolation } from '@emotion/serialize';
import emotionNormalize from 'emotion-normalize';

const global = (theme: Theme): CSSInterpolation => css`
  ${emotionNormalize}

  * {
    font-family: ${theme.typography.fontFamily};
  }
`;

export default global;