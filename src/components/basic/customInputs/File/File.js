import React, { useRef, useState, useEffect } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import createEvent from '@/formHelpers/createEvent';
import renderTag from '@/formHelpers/renderTag';
import FileLabel from '@/generic/FileLabel';
import theme from '@/styles/theme';

import styles from './File.styles';

const useStyles = createUseStyles(styles);

function File({ className, id, accept, render, label, value, onChange, name }) {
  const classes = useStyles(theme);
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

  const Input = renderTag(render, 'Input');
  const Button = renderTag(render, 'Button');
  const Label = renderTag(render, 'Label');

  return (
    <div className={className}>
      <Label className={classNames(className, classes.label)} htmlFor={id}>
        {label}
        {!!value || (
          <Button
            variant="addFile"
            className={classes.button}
            onClick={() => {}}>
            Add file
          </Button>
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
      <Input
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
