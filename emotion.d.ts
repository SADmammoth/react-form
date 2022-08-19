import '@emotion/react';
import { Interpolation, Theme } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    typography: {
      fontFamily: string;
    };
  }
}
