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
};

export default styles;
