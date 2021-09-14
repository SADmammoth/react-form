/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import classNames from 'classnames';

import CheckboxGroup from '../CheckboxGroup';
import Toggle from '../Toggle';
import createEvent from '@/formHelpers/createEvent';
import renderTag from '@/formHelpers/renderTag';

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
    },
    ref,
  ) => {
    const Input = renderTag(render, 'Input');
    const Tag = renderTag(render, 'Tag');

    return (
      <div ref={ref} className={classes.header}>
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
                showList(!listShown);
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
        />
      </div>
    );
  },
);

export default Field;
