const styles = {
  label: {
    display: 'flex',
    maxHeight: 100,
    overflowY: 'auto',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  selectedFile: {
    border: (theme) => `1px solid ${theme.highlightColor}`,
  },
  input: {
    display: 'none',
  },
  disabled: {
    color: (theme) => theme.mutedColor,
    cursor: (theme) => theme.disabledCursor,
  },
};

export default styles;
