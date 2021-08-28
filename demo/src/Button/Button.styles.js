const commonButton = {
  width: 40,
  height: 20,
  textAlign: 'center',
  position: 'absolute',
  padding: 2,
  fontSize: '0.7rem',
  right: 2,
  top: 2,
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
  },
  close: {
    background: 'none',
    border: 'none',
    outline: 'none',

    cursor: 'pointer',
    '&::before': {
      content: "'\\00d7'",
      color: 'black',
      fontSize: '1rem',
    },
  },
};

export default styles;
