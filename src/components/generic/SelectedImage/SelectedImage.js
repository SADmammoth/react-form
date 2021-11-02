import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import FileLabel from '@/generic/FileLabel';
import theme from '@/styles/theme';
import styles from './SelectedImage.styles';

const useStyles = createUseStyles(styles);

const SelectedImage = ({
  url,
  fileName,
  size,
  onClose,
  ButtonTag,
  disabled,
  render,
}) => {
  const classes = useStyles(theme);

  return (
    <picture
      className={classNames(classes.imageFile, {
        [classes.disabled]: disabled,
      })}>
      <img className={classes.image} src={url} alt={fileName} />
      <FileLabel
        name={fileName}
        size={size}
        onClose={onClose}
        ButtonTag={ButtonTag}
        disabled={disabled}
        render={render}
      />
    </picture>
  );
};

export default SelectedImage;
