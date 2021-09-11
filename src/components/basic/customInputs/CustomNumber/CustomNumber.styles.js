const buttonsBasic = {
  position: 'absolute',
  border: 'none',
  outline: 'none',
  background: 'none',
  padding: 5,
  cursor: 'pointer',

  fontSize: 18,
  width: 20,
  height: 8,
  textAlign: 'center',
  lineHeight: 0.1,
  right: 1,
  margin: 0,
};

const styles = {
  number: {
    position: 'relative',
  },

  input: {
    border: (theme) => `${theme.borderWidth} solid ${theme.commonColor}`,
    boxSizing: 'border-box',
    width: '100%',
    padding: '1%',
  },

  plusButton: {
    ...buttonsBasic,
    top: 2,
  },

  minusButton: {
    ...buttonsBasic,
    bottom: 2,
  },
};

export default styles;
