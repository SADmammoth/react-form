import { merge } from 'lodash-es';

const simpleCheckbox = {
  appearance: 'none',
  outline: 'none',
  position: 'relative',
  padding: 'none',
  width: 10,
  height: 10,
  margin: 0,
  marginRight: 10,
  marginBottom: 1,
  cursor: 'pointer',

  '&::before': {
    content: "''",
    display: 'block',
    position: 'absolute',
    width: 10,
    height: 10,
    border: (theme) => `${theme.borderWidth} solid ${theme.commonColor}`,
    borderRadius: (theme) => `${theme.borderRadius}`,
    backgroundColor: 'none',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  '&:checked::after': {
    content: "''",
    display: 'block',
    position: 'absolute',
    width: 6,
    height: 6,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    background: (theme) => `${theme.highlightColor}`,
    border: (theme) => `${theme.borderWidth} solid ${theme.commonColor}`,
    borderRadius: (theme) => `${theme.borderRadius}`,
  },
};

const styles = {
  checkbox: { ...simpleCheckbox },

  radio: {
    ...merge({}, simpleCheckbox, {
      '&::before': {
        borderRadius: '100%',
      },
      '&:checked::after': {
        borderRadius: '100%',
      },
    }),
  },

  toggle: {
    appearance: 'none',
    outline: 'none',
    position: 'relative',
    margin: 0,
    marginRight: 10,
    marginBottom: '-2px',
    cursor: 'pointer',

    '&::before': {
      content: "''",
      display: 'block',
      width: 24,
      height: 12,
      border: (theme) => `${theme.borderWidth} solid ${theme.commonColor}`,
      borderRadius: 10,
      backgroundColor: 'none',
    },

    '&:checked::before': {
      border: (theme) => `${theme.borderWidth} solid ${theme.highlightColor}`,
      backgroundColor: (theme) => theme.mutedColor,
    },

    '&::after': {
      content: "''",
      display: 'block',
      position: 'absolute',
      right: 'unset',
      left: (theme) => `calc(${theme.borderWidth} + 2px)`,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 8,
      height: 8,
      borderRadius: '100%',
      backgroundColor: (theme) => theme.commonColor,
    },

    '&:checked::after': {
      content: "''",
      left: 'unset',
      right: (theme) => `calc(${theme.borderWidth} + 2px)`,
      backgroundColor: (theme) => theme.highlightColor,
    },
  },

  spoiler: {
    appearance: 'none',
    outline: 'none',
    position: 'relative',
    margin: 0,
    marginRight: 5,
    marginBottom: '-2px',
    cursor: 'pointer',

    '&::before': {
      content: "'\\25BC'",
    },

    '&:checked::before': {
      content: "'\\25B2'",
    },
  },
};

export default styles;
