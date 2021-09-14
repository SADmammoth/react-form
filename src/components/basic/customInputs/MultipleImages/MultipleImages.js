import React, { useRef } from 'react';

import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import createEvent from '@/formHelpers/createEvent';
import renderTag from '@/formHelpers/renderTag';
import SelectedImage from '@/generic/SelectedImage';
import theme from '@/styles/theme';

import styles from './MultipleImages.styles';

const useStyles = createUseStyles(styles);

function MultipleImages({
  className,
  id,
  accept,
  render,
  label,
  value,
  onChange,
  name,
}) {
  const classes = useStyles(theme);
  const input = useRef({});

  const Input = renderTag(render, 'Input');
  const Button = renderTag(render, 'Button');
  const Label = renderTag(render, 'Label');

  return (
    <div className={className}>
      <Label className={classes.label} htmlFor={id}>
        {label}
        <Button variant="addFile" className={classes.button} onClick={() => {}}>
          Add file
        </Button>
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

      <Input
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
