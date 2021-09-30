const styles = {
  password: {
    backgroundColor: (theme) => `${theme.bgColor}`,
    border: (theme) => `${theme.borderWidth} solid ${theme.commonColor}`,
    borderRadius: (theme) => `${theme.borderRadius}`,
    color: (theme) => `${theme.commonColor}`,
    outlineColor: (theme) => `${theme.highlightColor}`,
    padding: '2%',

    '&::-webkit-input-placeholder': {
      color: (theme) => `${theme.mutedColor}`,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: (theme) => theme.commonColor,
      width: 5,
    },

    '&::-webkit-scrollbar': {
      width: 5,
    },

    width: '100%',
    boxSizing: 'border-box',
  },
  passwordButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  actionButtonWrapper: {
    position: 'relative',
  },
  disabled: {
    color: (theme) => theme.mutedColor,
    borderColor: (theme) => theme.mutedColor,
    backgroundColor: (theme) => theme.disabledBgColor,
    cursor: (theme) => theme.disabledCursor,
  },
};

export default styles;
