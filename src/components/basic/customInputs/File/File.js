import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import Button from '@/generic/Button';
import FileLabel from '@/generic/FileLabel';
import createEvent from '@/helpers/createEvent';
import renderTag from '@/helpers/renderTag';
import theme from '@/styles/theme';
import styles from './File.styles';

const useStyles = createUseStyles(styles);

function File({
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
  const Label = renderTag(render, 'Label');

  return (
    <div className={classNames(className, { [classes.disabled]: disabled })}>
      <Label className={classNames(className, classes.label)} htmlFor={id}>
        {label}
        {!!value || (
          <Button
            variant="addFile"
            className={classes.button}
            onClick={() => {}}
            disabled={disabled}
            render={render}>
            Add file
          </Button>
        )}
      </Label>
      {!value || (
        <FileLabel
          name={currentValue.fileName}
          size={currentValue.size}
          onClose={onClose}
          ButtonTag={Button}
          disabled={disabled}
          render={render}
        />
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
        disabled={disabled}
      />
    </div>
  );
}

File.propTypes = {};

export default File;
