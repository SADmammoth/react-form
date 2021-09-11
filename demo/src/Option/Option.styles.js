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
      background: 'lightgray',
    },
  },
  searchResult: {
    fontWeight: 'bold',
  },
  disabled: {
    border: '1px solid black',
    color: 'lightgray',
    cursor: 'auto',
  },
  active: {
    color: 'black',
    backgroundColor: 'lightgray',
    cursor: 'auto',
  },
};

export default styles;
