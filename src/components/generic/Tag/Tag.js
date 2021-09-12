import React from 'react';

// import PropTypes from 'prop-types';
import { useTheme, createUseStyles } from 'react-jss';

import Button from '../Button';
import renderTag from '@/formHelpers/renderTag';
import theme from '@/styles/theme';

import styles from './Tag.styles';

const useStyles = createUseStyles(styles);

function Tag({ render, children, onDelete }) {
  const classes = useStyles(theme);

  const onClick = (event) => {
    onDelete(event);
    event.preventDefault();
  };

  const Button = renderTag(render, 'Button');

  return (
    <div className={classes.tag}>
      {children}
      <Button className={classes.remove} variant="close" onClick={onClick} />
    </div>
  );
}

Tag.propTypes = {};

export default Tag;
