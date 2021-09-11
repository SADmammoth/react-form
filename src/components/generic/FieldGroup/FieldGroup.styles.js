const styles = {
  group: {
    borderBottom: (theme) => `1px solid ${theme.mutedColor}`,
    paddingTop: 5,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    margin: '10px 0',
  },
  title: {
    padding: 0,
    margin: 0,
    fontWeight: 'bold',
    fontSize: '1.05rem',
    paddingBottom: 5,
    borderBottom: (theme) => `1px solid ${theme.mutedColor}`,
  },
};

export default styles;
