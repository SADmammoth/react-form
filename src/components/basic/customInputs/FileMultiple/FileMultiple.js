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
        <div className={classes.selectedFile}>
          <FileLabel
            name={fileName}
            size={size}
            onClose={onClose}
            ButtonTag={Button}
          />
        </div>
      );
    });
  };

  const Input = renderTag(render, 'Input');
  const Button = renderTag(render, 'Button');
  const Label = renderTag(render, 'Label');

  return (
    <div>
      <Label className={classNames(classes.label, className)} htmlFor={id}>
        {label}
        <Button
          variant={value.length > 0 ? 'appendFile' : 'addFile'}
          className={classes.button}
          onClick={() => {}}>
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
      />
    </div>
  );
}

FileMultiple.propTypes = {};

export default FileMultiple;
