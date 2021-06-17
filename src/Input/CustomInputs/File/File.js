import React, { useRef } from 'react';

import PropTypes from 'prop-types';

import createEvent from '../../../helpers/createEvent';
import formatFileSize from '../../../helpers/formatFileSize';
import Button from '../Button';

function File({ id, accept, render, label, value, onChange, name }) {
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
    <div className="form-group">
      <Label className="form-label file_label" htmlFor={id}>
        {label}
        {!!value || <div className="button">{'Add file'}</div>}
      </Label>
      {!value || (
        <div className="selected-file">
          <div className="file">
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
          onChange(createEvent(name, event.target.files[0]));
        }}
      />
    </div>
  );
}

File.propTypes = {};

export default File;