const styles = {
  background: {
    display: 'inline-block',
    width: '75%',
    height: 2,
    background: (theme) => theme.mutedColor,
    position: 'relative',
    cursor: 'pointer',

    '&::before': {
      content: '""',
      width: ({ from, to }) => `${to - from}%`,
      height: 2,
      position: 'absolute',
      left: ({ from }) => `${from}%`,
      background: (theme) => theme.commonColor,
    },
  },
};

export default styles;
