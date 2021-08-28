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
  close: {
    background: 0,
    border: 'none',
    outline: 'none',
    height: 5,
    width: 5,

    cursor: 'pointer',
    close: {
      background: 'none',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      '&::before': {
        content: "'\\00d7'",
        color: (theme) => theme.commonColor,
        fontSize: '1rem',
      },
    },
  },
};

export default styles;
