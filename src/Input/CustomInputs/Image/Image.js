import React, { useRef } from 'react';

import PropTypes from 'prop-types';

import createEvent from '../../../helpers/createEvent';
import formatFileSize from '../../../helpers/formatFileSize';
import Button from '../Button';

function Image({ id, accept, render, label, value, onChange, name }) {
  const InputTag = render.Input || 'input';
  const Label = render.label || 'label';
  const input = useRef({});
  return (
    <div className="form-image">
      <Label className="form-label file_label" htmlFor={id}>
        {label}
        {!!value || <div className="button">{'Add file'}</div>}

        {!value || (
          <picture className="image-file">
            <img className="image" src={value.url} alt={value.fileName} />
            <caption className="image-caption">
              <p className="file_name">{value.fileName}</p>
              <p className="file_size">{formatFileSize(value.fileSize)}</p>{' '}
              <button
                type="button"
                className="close_button"
                onClick={() => {
                  onChange(createEvent(name, ''));
                  input.current.value = '';
                }}>
                x
              </button>
            </caption>
          </picture>
        )}
      </Label>

      <InputTag
        id={id}
        ref={input}
        className="file_input"
        type="file"
        {...(value ? {} : { value: '' })}
        name={name}
        accept={'image/' + (accept || '*')}
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

Image.propTypes = {};

export default Image;
