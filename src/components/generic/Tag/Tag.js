import React from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import renderTag from '@/helpers/renderTag';
import theme from '@/styles/theme';
import Button from '../Button';
import styles from './Tag.styles';

const useStyles = createUseStyles(styles);

function Tag({ render, children, onDelete, disabled }) {
  const classes = useStyles(theme);

  const onClick = (event) => {
    onDelete(event);
    event.preventDefault();
  };

  const Tag = renderTag(render, 'Tag');

  return (
    <Tag className={classes.tag}>
      {children}
      <Button
        className={classes.remove}
        variant="close"
        onClick={onClick}
        disabled={disabled}
      />
    </Tag>
  );
}

Tag.propTypes = {};

export default Tag;
