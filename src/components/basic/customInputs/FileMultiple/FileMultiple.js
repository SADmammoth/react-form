import React, { useRef } from 'react';

import classNames from 'classnames';
import { differenceBy } from 'lodash-es';
import PropTypes from 'prop-types';
import { useTheme, createUseStyles } from 'react-jss';

import createEvent from '@/formHelpers/createEvent';
import renderTag from '@/formHelpers/renderTag';
import FileLabel from '@/generic/FileLabel/FileLabel';
import getFileHash from '@/helpers/getFileHash';
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

  const renderFiles = () => {
    return value.reverse().map((file, index) => {
      if (!file) return;

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
  };

  const Input = renderTag(render, 'Input');
  const Button = renderTag(render, 'Button');
  const Label = renderTag(render, 'Label');

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
          let newFiles = differenceBy(newValue, value, getFileHash);

          if (newFiles.length < newValue.length) {
            let existingFiles = differenceBy(newValue, newFiles, getFileHash);

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
