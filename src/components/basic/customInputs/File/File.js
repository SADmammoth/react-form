import React, { useRef, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useTheme, createUseStyles } from 'react-jss';

import FileLabel from '../../../generic/FileLabel/FileLabel';
import createEvent from '@/formHelpers/createEvent';
import Button from '@/generic/Button';
import theme from '@/styles/theme';

import styles from './File.styles';

const useStyles = createUseStyles(styles);

function File({ id, accept, render, label, value, onChange, name }) {
  const classes = useStyles(theme);

  const InputTag = render.Input || 'input';
  const Label = render.label || 'label';
  const input = useRef({});

  const [currentValue, setCurrentValue] = useState({});
  useEffect(() => {
    if (value) {
      const { name: fileName, size } = value;
      setCurrentValue({ fileName, size, url: URL.createObjectURL(value) });
    }

    return () => {
      URL.revokeObjectURL(currentValue.url);
    };
  }, [value]);

  const onClose = () => {
    onChange(createEvent(name, ''));
    input.current.value = '';
  };

  const ButtonTag = render.Button || Button;

  return (
    <div>
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
      </Label>
      {!value || (
        <div className={classes.selectedFile}>
          <FileLabel
            name={currentValue.fileName}
            size={currentValue.size}
            onClose={onClose}
            ButtonTag={ButtonTag}
          />
        </div>
      )}
      <InputTag
        id={id}
        ref={input}
        className={classes.input}
        type="file"
        {...(value ? {} : { value: '' })}
        name={name}
        accept={accept}
        onChange={(event) => {
          onChange(createEvent(name, event.target.files[0]));
        }}
      />
    </div>
  );
}

File.propTypes = {};

export default File;
