const styles = {
  spoiler: {
    position: 'absolute',
    right: '3%',
    top: '50%',
    transform: 'translateY(-50%)',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    background: 'none',
    border: 0,

    '&::-webkit-input-placeholder': {
      color: (theme) => `${theme.mutedColor}`,
    },
    fontFamily: 'inherit',
    fontSize: '1rem',
    padding: '0',
  },
  disabledSelect: {
    color: (theme) => `${theme.mutedColor}`,
  },
  header: {
    backgroundColor: (theme) => `${theme.bgColor}`,
    border: (theme) => `${theme.borderWidth} solid ${theme.commonColor}`,
    borderRadius: (theme) => `${theme.borderRadius}`,
    color: (theme) => `${theme.commonColor}`,
    outlineColor: (theme) => `${theme.highlightColor}`,
    padding: '1%',

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: (theme) => `${theme.commonColor}`,
      width: 5,
    },

    '&::-webkit-scrollbar': {
      width: 5,
    },

    width: '100%',
    boxSizing: 'border-box',
  },
  disabled: {
    color: (theme) => theme.mutedColor,
    borderColor: (theme) => theme.mutedColor,
    backgroundColor: (theme) => theme.disabledBgColor,
    cursor: (theme) => theme.disabledCursor,
    '& $label': {
      color: (theme) => theme.mutedColor,
    },
  },
};

export default styles;
