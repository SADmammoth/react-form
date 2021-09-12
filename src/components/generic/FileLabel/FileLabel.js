import React from 'react';

import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import formatFileSize from '@/helpers/formatFileSize';
import theme from '@/styles/theme';

import styles from './FileLabel.styles';

const useStyles = createUseStyles(styles);

function FileLabel({ ButtonTag, name, size, onClose }) {
  const classes = useStyles(theme);

  return (
    <div className={classes.file}>
      <p className={classes.name}>{name}</p>
      <p className={classes.size}>{formatFileSize(size)}</p>
      <ButtonTag
        type="button"
        variant="close"
        className={classes.close}
        onClick={onClose}
      />
    </div>
  );
}

FileLabel.propTypes = {};

export default FileLabel;
