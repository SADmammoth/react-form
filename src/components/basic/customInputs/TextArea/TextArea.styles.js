const styles = {
  textarea: {
    backgroundColor: (theme) => `${theme.bgColor}`,
    border: (theme) => `${theme.borderWidth} solid ${theme.commonColor}`,
    borderRadius: (theme) => `${theme.borderRadius}`,
    color: (theme) => `${theme.commonColor}`,
    outlineColor: (theme) => `${theme.highlightColor}`,
    padding: '2%',

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: (theme) => `${theme.commonColor}`,
      width: 5,
    },

    '&::-webkit-scrollbar': {
      width: 5,
    },
    resize: 'none',

    width: '100%',
    boxSizing: 'border-box',

    height: '90px',
  },
  placeholdered: {
    color: (theme) => theme.mutedColor,
  },
  disabled: {
    color: (theme) => theme.mutedColor,
    borderColor: (theme) => theme.mutedColor,
    backgroundColor: (theme) => theme.disabledBgColor,
    cursor: (theme) => theme.disabledCursor,
  },
};

export default styles;
