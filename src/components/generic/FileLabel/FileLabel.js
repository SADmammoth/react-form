import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import formatFileSize from '@/genericHelpers/formatFileSize';
import theme from '@/styles/theme';
import styles from './FileLabel.styles';

const useStyles = createUseStyles(styles);

function FileLabel({ ButtonTag, name, size, onClose, disabled, render }) {
  const classes = useStyles(theme);

  return (
    <div className={classNames(classes.file, { [classes.disabled]: disabled })}>
      <p className={classes.name}>{name}</p>
      <p className={classes.size}>{formatFileSize(size)}</p>
      <ButtonTag
        type="button"
        variant="close"
        className={classes.close}
        onClick={onClose}
        disabled={disabled}
        render={render}
      />
    </div>
  );
}

FileLabel.propTypes = {};

export default FileLabel;
