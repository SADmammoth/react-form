import { Theme } from '@emotion/react';

const themeConfig: Theme = {
  typography: {
    fontFamily: 'Segoe UI',
  },
  color: {
    common: '#9ebfeb',
    disabled: '#b9c1d0',
    background: '#fbfdff',
    highlight: '#4e89da',
    popupBackground: '#dde6f2',

    commonText: '#3d6094',
    secondaryText: '#9ebfeb',
    disabledText: '#b9c1d0',

    error: '#e15353',
    errorBackground: '#fdf0f0',
    errorSecondaryText: '#dd8e8e',
    errorText: '#bb3939',
  },
  misc: {
    borderRadius: '10px',
    inputWidth: '200px',
  },
};

export default themeConfig;
