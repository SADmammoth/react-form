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
  },
  disabledSelect: {
    color: (theme) => `${theme.mutedColor}`,
  },
  '&::placeholdered': {
    color: (theme) => `${theme.mutedColor}`,
  },
  header: {
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

    width: '100%',
    padding: '1%',
    boxSizing: 'border-box',
  },
};

export default styles;
