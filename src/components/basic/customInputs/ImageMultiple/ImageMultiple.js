import React, { useRef } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import SelectedImage from '@/generic/SelectedImage';
import createEvent from '@/helpers/createEvent';
import renderTag from '@/helpers/renderTag';
import theme from '@/styles/theme';
import styles from './ImageMultiple.styles';

const useStyles = createUseStyles(styles);

function ImageMultiple({
  className,
  id,
  accept,
  render,
  label,
  value,
  onChange,
  name,
  disabled,
}) {
  const classes = useStyles(theme);
  const input = useRef({});

  const Input = renderTag(render, 'Input');
  const Button = renderTag(render, 'Button');
  const Label = renderTag(render, 'Label');

  return (
    <div
      className={classNames(className, {
        [classes.disabled]: disabled,
      })}>
      <Label className={classes.label} htmlFor={id}>
        {label}
        <Button
          variant="addFile"
          className={classes.button}
          onClick={() => {}}
          disabled={disabled}>
          Add file
        </Button>
        <div className={classes.gallery}>
          {!value ||
            value.map((image, index, images) => {
              if (!image) return null;
              const { name: fileName, size } = image;
              const url = URL.createObjectURL(image);

              const onClose = () => {
                const copy = [...images];
                copy.splice(index, 1);
                onChange(createEvent(name, copy));
                input.current.value = '';
              };
              return (
                <SelectedImage
                  url={url}
                  fileName={fileName}
                  size={size}
                  onClose={onClose}
                  ButtonTag={Button}
                  disabled={disabled}
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
        accept={`image/${accept || '*'}`}
        onChange={(event) => {
          const newValue = Array.from(event.target.files).map((file) => file);
          newValue.unshift(...value);

          onChange(createEvent(name, newValue));
        }}
        disabled={disabled}
      />
    </div>
  );
}

ImageMultiple.propTypes = {};

export default ImageMultiple;
