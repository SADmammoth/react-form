const styles = {
  file: {
    display: 'flex',
    padding: 5,
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: '5px',
    border: (theme) => `1px solid ${theme.highlightColor}`,
  },

  name: {
    fontWeight: 'bold',
    margin: 0,
    marginRight: 5,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '90%',
    overflow: 'hidden',
  },

  size: {
    margin: 0,
    marginRight: 5,
    fontSize: '0.8rem',
  },

  close: {
    position: 'absolute',
    right: 0,
  },

  disabled: {
    color: (theme) => theme.mutedColor,
    borderColor: (theme) => theme.mutedColor,
    cursor: (theme) => theme.disabledCursor,
  },
};

export default styles;
