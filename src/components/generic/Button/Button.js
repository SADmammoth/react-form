import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import renderTag from '@/helpers/renderTag';
import theme from '@/styles/theme';
import styles from './Button.styles';

const useStyles = createUseStyles(styles);

function Button({
  type,
  variant,
  children,
  className,
  onClick,
  disabled,
  render,
  ...props
}) {
  const classes = useStyles(theme);

  const ButtonTag = renderTag(render, 'Button');

  return (
    <ButtonTag
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classNames(className, classes.button, classes[variant])}
      onClick={(event) => {
        event.preventDefault();

        if (!disabled) onClick(event);
      }}
      disabled={disabled}
      data-variant={variant}
      {...props}>
      {children}
    </ButtonTag>
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
