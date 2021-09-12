import React from 'react';

import renderTag from '@/formHelpers/renderTag';

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
    },
    ref,
  ) => {
    const Input = renderTag(render, 'Input');

    return (
      <Input
        ref={ref}
        type="text"
        className={classes.input}
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
      />
    );
  },
);

export default Field;
