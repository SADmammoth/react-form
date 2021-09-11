const styles = {
  input: {
    fontFamily: 'inherit',
    fontSize: '1rem',
    backgroundColor: 'none',
    border: 'none',
    borderRadius: 'none',
    color: 'none',
    outline: 'none',

    '&::-webkit-input-placeholder': {
      color: (theme) => `${theme.mutedColor}`,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: (theme) => `${theme.commonColor}`,
      width: 5,
    },

    '&::-webkit-scrollbar': {
      width: 5,
    },

    padding: '0',
    boxSizing: 'border-box',
  },
  header: {
    padding: '1%',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: (theme) => `${theme.bgColor}`,
    border: (theme) => `${theme.borderWidth} solid ${theme.commonColor}`,
    borderRadius: (theme) => `${theme.borderRadius}`,
    color: (theme) => `${theme.commonColor}`,
    outlineColor: (theme) => `${theme.highlightColor}`,
    '& > *:not(:first-child)': {
      marginLeft: '5px',
    },
  },
};

export default styles;
