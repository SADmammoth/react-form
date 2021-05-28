import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import createEvent from '../../../helpers/createEvent';
import formatFileSize from '../../../helpers/formatFileSize';
import Button from '../Button';

function Image({ id, accept, render, label, value, onChange, name }) {
  const InputTag = render.Input || 'input';
  const Label = render.label || 'label';
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
  return (
    <div className="form-image">
      <Label className="form-label file_label" htmlFor={id}>
        {label}
        {!!value || <div className="button">{'Add file'}</div>}

        {!value || (
          <picture className="image-file">
            <img
              className="image"
              src={currentValue.url}
              alt={currentValue.fileName}
            />
            <caption className="image-caption">
              <p className="file_name">{currentValue.fileName}</p>
              <p className="file_size">{formatFileSize(currentValue.size)}</p>
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
          const file = event.target.files[0];
          onChange(createEvent(name, file));
        }}
      />
    </div>
  );
}

Image.propTypes = {};

export default Image;
