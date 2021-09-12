import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import theme from '@/styles/theme';

import styles from './Button.styles';

const useStyles = createUseStyles(styles);

function Button({ type, variant, children, className, onClick, ...props }) {
  const classes = useStyles(theme);

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
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

Button.defaultProps = {
  type: 'button',
};

Button.propTypes = {
  type: PropTypes.string,
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
