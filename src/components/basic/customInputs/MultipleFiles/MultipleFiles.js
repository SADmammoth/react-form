import React, { useRef } from 'react';

import classNames from 'classnames';
import { differenceBy } from 'lodash-es';
import PropTypes from 'prop-types';
import { useTheme, createUseStyles } from 'react-jss';

import FileLabel from '../../../generic/FileLabel/FileLabel';
import createEvent from '@/formHelpers/createEvent';
import Button from '@/generic/Button';
import getFileHash from '@/helpers/getFileHash';
import theme from '@/styles/theme';

import styles from './MultipleFiles.styles';

const useStyles = createUseStyles(styles);

function MultipleFiles({
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
  const Label = render.label || 'label';
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
            ButtonTag={ButtonTag}
          />
        </div>
      );
    });
  };

  const ButtonTag = render.Button || Button;

  return (
    <div>
      <Label className={classNames(classes.label, className)} htmlFor={id}>
        {label}
        <ButtonTag
          variant={value.length > 0 ? 'appendFile' : 'addFile'}
          className={classes.button}
          onClick={() => {}}
          style={{ 'pointer-events': 'none' }}>
          Add file
        </ButtonTag>
      </Label>
      {!value || <div>{renderFiles()}</div>}
      <InputTag
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

MultipleFiles.propTypes = {};

export default MultipleFiles;
