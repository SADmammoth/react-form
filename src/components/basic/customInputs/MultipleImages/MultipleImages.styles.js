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

  gallery: {
    overflowX: 'auto',
    flexDirection: 'row',
    display: 'flex',
    '&>*:not(:first-child)': {
      marginLeft: '5px',
    },
  },
};

export default styles;