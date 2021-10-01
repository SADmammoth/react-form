import React from 'react';
import classNames from 'classnames';
import renderTag from '@/helpers/renderTag';

const Field = React.forwardRef(
  (
    {
      classes,
      placeholder,
      currentLabel,
      showList,
      setCurrentLabel,
      render,
      onBlur,
      disabled,
    },
    ref,
  ) => {
    const Input = renderTag(render, 'Input');

    return (
      <Input
        ref={ref}
        type="text"
        className={classNames(classes.input, { [classes.disabled]: disabled })}
        placeholder={placeholder || 'Start typing to see options...'}
        value={currentLabel || ''}
        aria-disabled={!currentLabel ? 'disabled' : null}
        onChange={(event) => {
          setCurrentLabel(event.target.value);
        }}
        onFocus={() => {
          showList(true);
        }}
        onBlur={onBlur}
        disabled={disabled}
      />
    );
  },
);

export default Field;
