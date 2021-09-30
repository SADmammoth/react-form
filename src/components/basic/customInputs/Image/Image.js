import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import createEvent from '@/formHelpers/createEvent';
import SelectedImage from '@/generic/SelectedImage';
import renderTag from '@/helpers/formHelpers/renderTag';
import theme from '@/styles/theme';
import styles from './Image.styles';

const useStyles = createUseStyles(styles);

function Image({
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

  const [currentValue, setCurrentValue] = useState({});
  useEffect(() => {
    if (value) {
      const { name: fileName, size } = value;
      setCurrentValue({
        fileName,
        size,
        url: value instanceof File ? URL.createObjectURL(value) : value,
      });
    }

    return () => {
      URL.revokeObjectURL(currentValue.url);
    };
  }, [value]);

  const Input = renderTag(render, 'Input');
  const Button = renderTag(render, 'Button');
  const Label = renderTag(render, 'Label');

  const onClose = () => {
    onChange(createEvent(name, ''));
    input.current.value = '';
  };

  return (
    <div className={classNames(className, { [classes.disabled]: disabled })}>
      <Label className={classes.label} htmlFor={id}>
        {label}
        {!!value || (
          <Button
            variant="addFile"
            className={classes.button}
            onClick={() => {}}
            disabled={disabled}>
            Add file
          </Button>
        )}

        {!value || (
          <SelectedImage
            url={currentValue.url}
            fileName={currentValue.fileName}
            size={currentValue.size}
            onClose={onClose}
            ButtonTag={Button}
            disabled={disabled}
          />
        )}
      </Label>

      <Input
        id={id}
        ref={input}
        className={classes.input}
        type="file"
        {...(value ? {} : { value: '' })}
        name={name}
        accept={`image/${accept || '*'}`}
        onChange={(event) => {
          const file = event.target.files[0];
          onChange(createEvent(name, file));
        }}
        disabled={disabled}
      />
    </div>
  );
}

Image.propTypes = {};

export default Image;
