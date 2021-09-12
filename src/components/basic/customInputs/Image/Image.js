import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
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
    <div className={className}>
      <Label className={classes.label} htmlFor={id}>
        {label}
        {!!value || (
          <Button
            variant="addFile"
            className={classes.button}
            onClick={() => {}}
            style={{ 'pointer-events': 'none' }}>
            Add file
          </Button>
        )}

        {!value || (
          <SelectedImage
            url={currentValue.url}
            fileName={currentValue.fileName}
            size={currentValue.size}
            onClose={onClose}
            ButtonTag={ButtonTag}
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
        accept={'image/' + (accept || '*')}
        onChange={(event) => {
          const file = event.target.files[0];
          onChange(createEvent(name, file));
        }}
      />
    </div>
  );
}

Image.propTypes = {};

export default Image;
