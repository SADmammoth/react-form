import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTheme, createUseStyles } from 'react-jss';

import theme from '@/styles/theme';

import styles from './Button.styles';

const useStyles = createUseStyles(styles);

function Button({ type, variant, children, className, onClick, ...props }) {
  const classes = useStyles(theme);

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
      className={classNames(className, classes[variant])}
      onClick={(event) => {
        event.preventDefault();
        onClick(event);
      }}
      {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    'actionButton',
    'hidePassword',
    'showPassword',
    'addFile',
    'close',
  ]),
};

export default Button;
