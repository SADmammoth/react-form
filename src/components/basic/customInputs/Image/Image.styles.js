const styles = {
  input: {
    display: 'none',
  },

  label: {
    display: 'flex',
    maxHeight: 100,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    maxHeight: 'none',
    maxWidth: 700,
  },

  disabled: {
    color: (theme) => theme.mutedColor,
    cursor: (theme) => theme.disabledCursor,
  },
};

export default styles;
