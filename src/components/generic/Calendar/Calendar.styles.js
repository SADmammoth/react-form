const styles = {
  calendarGrid: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      display: 'flex',
      '& > *': { width: '25px', height: '25px', textAlign: 'center' },
    },
  },
  otherMonth: {
    color: (theme) => theme.mutedColor,
  },
  today: {
    color: (theme) => theme.errorColor,
  },
};
export default styles;
