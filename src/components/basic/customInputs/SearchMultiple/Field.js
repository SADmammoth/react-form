/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import classNames from 'classnames';
import createEvent from '@/helpers/createEvent';
import renderTag from '@/helpers/renderTag';

const Field = React.forwardRef(
  (
    {
      classes,
      name,
      placeholder,
      currentLabel,
      showList,
      // listShown,
      setCurrentLabel,
      render,
      onChange,
      currentValue,
      valueOptions,
      disabled,
    },
    ref,
  ) => {
    const Input = renderTag(render, 'Input');
    const Tag = renderTag(render, 'Tag');

    const mapCurrentValue = useCallback(
      (value) => {
        const valueOption = valueOptions.find(
          ({ value: candidateValue }) => candidateValue === value,
        );
        if (!valueOption) return null;

        return (
          <Tag
            render={render}
            onDelete={() => {
              onChange(createEvent(name, valueOption.label));
            }}
            disabled={disabled}>
            {valueOption.label}
          </Tag>
        );
      },
      [valueOptions, currentValue],
    );

    return (
      <div
        ref={ref}
        className={classNames(classes.header, {
          [classes.disabled]: disabled,
        })}>
        {currentValue && currentValue.length
          ? currentValue.map(mapCurrentValue)
          : null}
        <Input
          type="text"
          className={classes.input}
          placeholder={placeholder || 'Start typing to see options...'}
          value={currentLabel || ''}
          aria-disabled={!currentLabel ? 'disabled' : null}
          onChange={(event) => {
            setCurrentLabel(event.target.value);
          }}
          onInput={(event) => {
            setCurrentLabel(event.target.value);
          }}
          onFocus={() => {
            showList(true);
          }}
          disabled={disabled}
        />
      </div>
    );
  },
);

export default Field;
