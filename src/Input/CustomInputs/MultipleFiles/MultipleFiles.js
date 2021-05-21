import React, { useRef } from 'react';

import PropTypes from 'prop-types';

import createEvent from '../../../helpers/createEvent';
import formatFileSize from '../../../helpers/formatFileSize';
import Button from '../Button';

function MultipleFiles({ id, accept, render, label, value, onChange, name }) {
  const InputTag = render.Input || 'input';
  const Label = render.label || 'label';
  const input = useRef({});
  return (
    <div className="form-group">
      <Label className="form-label file_label" htmlFor={id}>
        {label}
        <div className="button">{'Add file'}</div>
      </Label>
      {!value || (
        <div className="selected-file">
          {value.map((file, index) => {
            return (
              <div className="file">
                <p className="file_name">{file.fileName}</p>
                <p className="file_size">{formatFileSize(file.fileSize)}</p>
                <button
                  type="button"
                  className="close_button"
                  onClick={() => {
                    const copy = [...value];
                    copy.splice(index, 1);
                    onChange(createEvent(name, copy));
                  }}>
                  x
                </button>
              </div>
            );
          })}
        </div>
      )}
      <InputTag
        multiple
        id={id}
        ref={input}
        className="file_input"
        type="file"
        {...(value ? {} : { value: '' })}
        name={name}
        accept={accept}
        onChange={(event) => {
          const newValue = Array.from(event.target.files).map((file) => {
            const url = URL.createObjectURL(file);
            return {
              url,
              fileName: file.name,
              fileSize: file.size,
            };
          });
          newValue.unshift(...value);

          onChange(createEvent(name, newValue));
        }}
      />
    </div>
  );
}

MultipleFiles.propTypes = {};

export default MultipleFiles;
