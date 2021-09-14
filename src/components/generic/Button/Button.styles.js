const commonButton = {
  width: 40,
  height: 20,
  textAlign: 'center',
  position: 'absolute',
  padding: 2,
  fontSize: '0.7rem',
  right: 2,
  top: 2,
  margin: 0,
};

const passwordButton = {
  color: 'transparent',
  fontSize: 0,
  background: 'none',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
};

const styles = {
  actionButton: {
    ...commonButton,
  },
  showPassword: {
    ...commonButton,
  },
  addFile: {
    display: 'inline-block',
    border: '1px solid black',
    padding: '6px 12px',
    cursor: 'pointer',
    pointerEvents: 'none',
  },
  close: {
    background: 'none',
    border: 'none',
    outline: 'none',
    margin: 0,
    padding: '0',
    cursor: 'pointer',
    verticalAlign: 'middle',

    '&::before': {
      content: "'\\00d7'",
      color: (theme) => theme.highlightColor,
      fontSize: '1rem',
    },
  },
  showPassword: {
    ...passwordButton,
    '&::before': {
      content: '"\\1f441"',
      fontSize: '1rem',
      color: (theme) => theme.highlightColor,
    },
  },
  hidePassword: {
    ...passwordButton,
    '&::before': {
      content: '"\\1f441"',
      fontSize: '1rem',
      color: 'black',
      background:
        'linear-gradient(to left top, transparent 45%, currentColor 50%, currentColor 50%, transparent 53%)',
    },
  },
};

export default styles;
