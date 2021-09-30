/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import classNames from 'classnames';
import createEvent from '@/formHelpers/createEvent';
import renderTag from '@/formHelpers/renderTag';
import Toggle from '../Toggle';

const Field = React.forwardRef(
  (
    {
      classes,
      name,
      placeholder,
      currentLabel,
      showList,
      listShown,
      setCurrentLabel,
      render,
      onChange,
      disabled,
    },
    ref,
  ) => {
    const Input = renderTag(render, 'Input');
    const Tag = renderTag(render, 'Tag');

    return (
      <div
        ref={ref}
        className={classNames(classes.header, {
          [classes.disabled]: disabled,
        })}>
        <div className={classes.tags}>
          {currentLabel && currentLabel.length ? (
            currentLabel.map((label) => (
              <Tag
                render={render}
                onDelete={() => {
                  onChange(createEvent(name, label));
                  setCurrentLabel(label);
                }}>
                {label}
              </Tag>
            ))
          ) : (
            <div
              className={classes.placeholder}
              onClick={() => {
                if (!disabled) showList(!listShown);
              }}>
              {placeholder || 'Choose option...'}
            </div>
          )}
          <Input
            className={classNames(classes.label, {
              [classes.disabledSelect]: !currentLabel,
            })}
            type="hidden"
            placeholder={placeholder || 'Choose option...'}
            value={currentLabel || ''}
            aria-disabled={!currentLabel ? 'disabled' : null}
            disabled
          />
        </div>
        <Toggle
          id="select-header-button"
          name="select-header-button"
          type="spoiler"
          className={classes.spoiler}
          checked={listShown}
          onChange={showList}
          render={render}
          disabled={disabled}
        />
      </div>
    );
  },
);

export default Field;
