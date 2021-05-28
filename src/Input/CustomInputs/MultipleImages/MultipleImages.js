import React, { useRef } from 'react';

import PropTypes from 'prop-types';

import createEvent from '../../../helpers/createEvent';
import formatFileSize from '../../../helpers/formatFileSize';
import Button from '../Button';

function MultipleImages({ id, accept, render, label, value, onChange, name }) {
  const InputTag = render.Input || 'input';
  const Label = render.label || 'label';
  const input = useRef({});
  return (
    <div className="form-image">
      <Label className="form-label file_label" htmlFor={id}>
        {label}
        <div className="button">{'Add file'}</div>
        <div className="selected-images">
          {!value ||
            value.map((image) => {
              if (!image) return;
              const { name: fileName, size } = image;
              const url = URL.createObjectURL(image);
              return (
                <picture className="image-file">
                  <img className="image" src={url} alt={fileName} />
                  <caption className="image-caption">
                    <p className="file_name">{fileName}</p>
                    <p className="file_size">{formatFileSize(size)}</p>
                    <button
                      type="button"
                      className="close_button"
                      onClick={() => {
                        const copy = [...image];
                        copy.splice(index, 1);
                        onChange(createEvent(name, copy));
                      }}>
                      x
                    </button>
                  </caption>
                </picture>
              );
            })}
        </div>
      </Label>

      <InputTag
        multiple
        id={id}
        ref={input}
        className="file_input"
        type="file"
        {...(value ? {} : { value: '' })}
        name={name}
        accept={'image/' + (accept || '*')}
        onChange={(event) => {
          const newValue = Array.from(event.target.files).map((file) => {
            return file;
          });
          newValue.unshift(...value);

          onChange(createEvent(name, newValue));
        }}
      />
    </div>
  );
}

MultipleImages.propTypes = {};

export default MultipleImages;
