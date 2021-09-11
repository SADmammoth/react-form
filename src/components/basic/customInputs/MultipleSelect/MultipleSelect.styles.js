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
  placeholder: {
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
    padding: '1%',
    boxSizing: 'border-box',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '90%',
    '&>*': {
      marginLeft: 2,
    },
  },
};

export default styles;
