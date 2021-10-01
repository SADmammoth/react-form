import React, { useRef } from 'react';
import classNames from 'classnames';
import { differenceBy } from 'lodash-es';
import { createUseStyles } from 'react-jss';
import FileLabel from '@/generic/FileLabel';
import getFileHash from '@/genericHelpers/getFileHash';
import createEvent from '@/helpers/createEvent';
import renderTag from '@/helpers/renderTag';
import theme from '@/styles/theme';
import styles from './FileMultiple.styles';

const useStyles = createUseStyles(styles);

function FileMultiple({
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

  const renderFiles = () =>
    value.reverse().map((file, index) => {
      if (!file) return null;

      const { name: fileName, size } = file;
      const onClose = () => {
        const copy = [...value];
        copy.splice(index, 1);
        onChange(createEvent(name, copy));
      };

      return (
        <FileLabel
          name={fileName}
          size={size}
          onClose={onClose}
          ButtonTag={Button}
          disabled={disabled}
        />
      );
    });

  return (
    <div className={classNames(className, { [classes.disabled]: disabled })}>
      <Label className={classes.label} htmlFor={id}>
        {label}
        <Button
          variant={value.length > 0 ? 'appendFile' : 'addFile'}
          className={classes.button}
          onClick={() => {}}
          disabled={disabled}>
          Add file
        </Button>
      </Label>
      {!value || <div>{renderFiles()}</div>}
      <Input
        multiple
        id={id}
        ref={input}
        className={classes.input}
        type="file"
        {...(value ? {} : { value: '' })}
        name={name}
        accept={accept}
        onChange={(event) => {
          const newValue = Array.from(event.target.files);
          const newFiles = differenceBy(newValue, value, getFileHash);

          if (newFiles.length < newValue.length) {
            const existingFiles = differenceBy(newValue, newFiles, getFileHash);

            console.error(
              `File(s) "${existingFiles
                .map((file) => file.name)
                .join('", "')}" already added`,
            );
          }
          newFiles.unshift(...value);

          onChange(createEvent(name, newFiles));
        }}
        disabled={disabled}
      />
    </div>
  );
}

FileMultiple.propTypes = {};

export default FileMultiple;
