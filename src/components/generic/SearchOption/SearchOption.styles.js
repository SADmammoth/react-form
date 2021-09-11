const styles = {
  option: {
    display: 'flex',
    justifyItems: 'flex-start',
    cursor: 'pointer',
    margin: 0,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    '&:not($disabled):hover': {
      background: (theme) => theme.mutedColor,
    },
  },
  searchResult: {
    fontWeight: 'bold',
  },
  disabled: {
    border: (theme) => `${theme.borderWidth} solid ${theme.mutedColor}`,
    color: (theme) => theme.mutedColor,
    cursor: 'auto',
  },
  active: {
    color: (theme) => theme.highlightColor,
    backgroundColor: (theme) => theme.mutedColor,
    cursor: 'auto',
  },
};

export default styles;
