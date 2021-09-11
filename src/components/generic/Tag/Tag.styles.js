const styles = {
  tag: {
    borderRadius: 20,
    border: (theme) => `${theme.borderWidth} solid ${theme.mutedColor}`,
    background: (theme) => `${theme.borderWidth} solid ${theme.mutedColor}`,
    padding: '0 5px',
    fontSize: '.9rem',
  },
  remove: {
    marginLeft: '2px',
  },
};

export default styles;
