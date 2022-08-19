import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import global from './global';
import themeConfig from './themeConfig';

const Theme: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={themeConfig}>
      <Global styles={global} />
      {children}
    </ThemeProvider>
  );
};
export default Theme;
