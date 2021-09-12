import React from 'react';

import { createUseStyles } from 'react-jss';

import FileLabel from '@/generic/FileLabel';
import theme from '@/styles/theme';

import styles from './SelectedImage.styles';

const useStyles = createUseStyles(styles);

const SelectedImage = ({ url, fileName, size, onClose, ButtonTag }) => {
  const classes = useStyles(theme);

  return (
    <picture className={classes.imageFile}>
      <img className={classes.image} src={url} alt={fileName} />
      <FileLabel
        name={fileName}
        size={size}
        onClose={onClose}
        ButtonTag={ButtonTag}
      />
    </picture>
  );
};

export default SelectedImage;
