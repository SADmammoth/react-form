import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { size } from 'lodash';
import PropTypes from 'prop-types';
import { useTheme, createUseStyles } from 'react-jss';

import createEvent from '@/formHelpers/createEvent';
import Button from '@/generic/Button';
import SelectedImage from '@/generic/SelectedImage';
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

  const InputTag = render.Input || 'input';
  const Label = render.Label || 'label';
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

  const ButtonTag = render.Button || Button;

  const onClose = () => {
    onChange(createEvent(name, ''));
    input.current.value = '';
  };

  return (
    <div className={className}>
      <Label className={classes.label} htmlFor={id}>
        {label}
        {!!value || (
          <ButtonTag
            variant="addFile"
            className={classes.button}
            onClick={() => {}}
            style={{ 'pointer-events': 'none' }}>
            Add file
          </ButtonTag>
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

      <InputTag
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
