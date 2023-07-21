import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Optional } from '../helpers/Optional';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import Button from './generic/Button';
import FileLabel from './generic/FileLabel';

interface IFileData {
  url: string;
  fileName: string;
  size: number;
}

const FileInput = ({
  type,
  label,
  name,
  formId,
  value,
  setValue,
  disabled,
  required,
  style,
}: InputComponentProps<InputsProps, InputType.File>) => {
  const id = formId + name;

  const fileLabelStyle = style ? style.fileLabel : null;
  const fileLabelsStyle = style ? style.fileLabels : null;

  const [currentValue, setCurrentValue] = useState<IFileData[]>([]);
  useEffect(() => {
    if (value && value.length) {
      setCurrentValue(
        value.map(({ name: fileName, size }) => {
          return { fileName, size, url: URL.createObjectURL(value[0]) };
        }),
      );
    }

    return () => {
      currentValue?.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [value]);

  const onClose = (index: number) => () => {
    if (!value) {
      return;
    }
    if (value.length === 1 && index === 0) {
      setValue(name, undefined);
      setCurrentValue([]);
    }
    setValue(name, [
      ...value.slice(0, index),
      ...value.slice(index + 1, value.length),
    ]);
    setCurrentValue([
      ...currentValue.slice(0, index),
      ...currentValue.slice(index + 1, currentValue.length),
    ]);
  };

  return (
    <div>
      <input
        id={id}
        type={type}
        name={name}
        // value={value ?? ''}
        onChange={(event) => {
          //@ts-ignore
          setValue(name, [...(value ?? []), ...event.target.files]);
          event.target.value = '';
        }}
        disabled={disabled}
        required={required}
      />

      <label htmlFor={id}>
        <Optional $={!!label}>
          <p>{label}</p>
        </Optional>
        <ul css={fileLabelsStyle}>
          {!currentValue ||
            currentValue.map(({ fileName, size }, i) => (
              <FileLabel
                name={fileName}
                size={size}
                onClose={onClose(i)}
                disabled={disabled}
              />
            ))}
        </ul>
      </label>
    </div>
  );
};

export default FileInput;

/*
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
*/
