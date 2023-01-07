import '@emotion/react';
import { Interpolation, Theme } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    typography: {
      fontFamily: string;
    };
    color: {
      common: string;
      disabled: string;
      background: string;
      highlight: string;
      popupBackground: string;

      commonText: string;
      secondaryText: string;
      disabledText: string;

      error: string;
      errorBackground: string;
      errorSecondaryText: string;
      errorText: string;
    };
    misc: {
      borderRadius: string;
      inputWidth: string;
    };
  }
}
