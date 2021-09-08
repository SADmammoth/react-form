const styles = {
  thumb: {
    position: 'relative',
    left: ({ position }) => `${position}%`,

    marginTop: '-4px',
    borderRadius: '100%',
    width: '10',
    height: '10',
    background: 'black',
    cursor: 'pointer',

    '&:hover $tip': {
      display: 'unset',
    },
  },
  tip: {
    bottom: '15px',
    position: 'absolute',
    border: 'none',
    background: 'none',
    outline: 'none',
    pointerEvents: 'none',
    display: 'none',
  },
  alwaysShown: {
    display: 'unset',
  },
  left: {
    '&::before': {
      content: "'\\25b6'",
      position: 'absolute',
      top: 0,
    },

    width: 20,
    height: 20,
    position: 'relative',

    marginTop: '-8px',
    marginLeft: '-2px',
    background: 'none',
    cursor: 'pointer',
  },
  right: {
    '&::before': {
      content: "'\\25c0'",
      position: 'absolute',
      top: 0,
    },

    width: 20,
    height: 20,
    position: 'relative',

    marginTop: '-20px',
    marginLeft: '-10px',
    background: 'none',
    cursor: 'pointer',
  },
};

export default styles;
