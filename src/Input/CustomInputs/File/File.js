import React, { useRef } from 'react';

import PropTypes from 'prop-types';

import createEvent from '../../../helpers/createEvent';
import formatFileSize from '../../../helpers/formatFileSize';
import Button from '../Button';

function File({ id, accept, render, label, value, onChange, name }) {
  const InputTag = render.Input || 'input';
  const Label = render.label || 'label';
  const input = useRef({});
  return (
    <div className="form-group">
      <Label className="form-label file_label" htmlFor={id}>
        {label}
        {!!value || <div className="button">{'Add file'}</div>}
      </Label>
      {!value || (
        <div className="selected-file">
          <div className="file">
            <p className="file_name">{value.fileName}</p>
            <p className="file_size">{formatFileSize(value.fileSize)}</p>
            <button
              type="button"
              className="close_button"
              onClick={() => {
                onChange(createEvent(name, ''));
                input.current.value = '';
              }}>
              x
            </button>
          </div>
        </div>
      )}
      <InputTag
        id={id}
        ref={input}
        className="file_input"
        type="file"
        {...(value ? {} : { value: '' })}
        name={name}
        accept={accept}
        onChange={(event) => {
          const url = URL.createObjectURL(event.target.files[0]);
          onChange(
            createEvent(name, {
              url,
              fileName: event.target.files[0].name,
              fileSize: event.target.files[0].size,
            }),
          );
        }}
      />
    </div>
  );
}

File.propTypes = {};

export default File;
