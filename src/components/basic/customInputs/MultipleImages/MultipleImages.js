import React, { useRef } from 'react';

import PropTypes from 'prop-types';
import { useTheme, createUseStyles } from 'react-jss';

import createEvent from '@/formHelpers/createEvent';
import Button from '@/generic/Button';
import SelectedImage from '@/generic/SelectedImage';
import theme from '@/styles/theme';

import styles from './MultipleImages.styles';

const useStyles = createUseStyles(styles);

function MultipleImages({ id, accept, render, label, value, onChange, name }) {
  const classes = useStyles(theme);

  const InputTag = render.Input || 'input';
  const Label = render.label || 'label';
  const input = useRef({});

  const ButtonTag = render.Button || Button;

  return (
    <div>
      <Label className={classes.label} htmlFor={id}>
        {label}
        <ButtonTag
          variant="addFile"
          className={classes.button}
          onClick={() => {}}
          style={{ 'pointer-events': 'none' }}>
          Add file
        </ButtonTag>
        <div className={classes.gallery}>
          {!value ||
            value.map((image) => {
              if (!image) return;
              const { name: fileName, size } = image;
              const url = URL.createObjectURL(image);
              const onClose = () => {
                const copy = [...image];
                copy.splice(index, 1);
                onChange(createEvent(name, copy));
              };
              return (
                <SelectedImage
                  url={url}
                  fileName={fileName}
                  size={size}
                  onClose={onClose}
                  ButtonTag={ButtonTag}
                />
              );
            })}
        </div>
      </Label>

      <InputTag
        multiple
        id={id}
        ref={input}
        className={classes.input}
        type="file"
        {...(value ? {} : { value: '' })}
        name={name}
        accept={'image/' + (accept || '*')}
        onChange={(event) => {
          const newValue = Array.from(event.target.files).map((file) => {
            return file;
          });
          newValue.unshift(...value);

          onChange(createEvent(name, newValue));
        }}
      />
    </div>
  );
}

MultipleImages.propTypes = {};

export default MultipleImages;
