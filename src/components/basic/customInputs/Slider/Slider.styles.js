import { noSelect } from '@/styles/mixins';

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
      width: ({ position }) => `${position}%`,
      height: 2,
      position: 'absolute',
      left: 0,
      background: (theme) => theme.commonColor,
    },
  },
  button: {
    background: 'none',
    outline: 'none',
    border: 'none',
    fontSize: '1rem',
    position: 'relative',
    top: '4px',
    cursor: 'pointer',
    ...noSelect,
  },

  disabled: {
    '& $background': {
      backgroundColor: (theme) => theme.disabledBgColor,
      '&::before': {
        backgroundColor: (theme) => theme.mutedColor,
      },
    },
    cursor: (theme) => theme.disabledCursor,
  },
};

export default styles;
