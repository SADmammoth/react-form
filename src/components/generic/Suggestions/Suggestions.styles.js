const styles = {
  select: {
    position: 'relative',
  },
  placeholdered: {
    color: '$muted',
  },
  list: {
    marginTop: 1,
    position: 'absolute',
    zIndex: '999',

    backgroundColor: (theme) => `${theme.bgColor}`,
    border: (theme) => `${theme.borderWidth} solid ${theme.commonColor}`,
    borderRadius: (theme) => `${theme.borderRadius}`,
    color: (theme) => `${theme.commonColor}`,
    outlineColor: (theme) => `${theme.highlightColor}`,

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
  scrollableList: {
    maxHeight: 100,
    overflowY: 'auto',
  },
  option: {
    display: 'flex',
    justifyItems: 'flex-start',
    cursor: 'pointer',
    margin: 0,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  //   .search-option {
  //     & :nth-child(n + 2) {
  //       marginLeft: 0,
  //     }
  //   }
};

export default styles;
