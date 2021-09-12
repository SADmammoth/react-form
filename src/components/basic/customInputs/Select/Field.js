/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import classNames from 'classnames';

import CheckboxGroup from '../CheckboxGroup';
import renderTag from '@/formHelpers/renderTag';

const Field = React.forwardRef(
  (
    { classes, placeholder, currentLabel, showList, listShown, render },
    ref,
  ) => {
    const Input = renderTag(render, 'Input');

    return (
      <div
        ref={ref}
        className={classes.header}
        onClick={() => {
          showList(!listShown);
        }}>
        <Input
          className={classNames(classes.label, {
            [classes.disabledSelect]: !currentLabel,
          })}
          type="text"
          placeholder={placeholder || 'Choose option...'}
          value={currentLabel || ''}
          aria-disabled={!currentLabel ? 'disabled' : null}
          disabled
        />
        <CheckboxGroup
          id="select-header-button"
          name="select-header-button"
          type="spoiler"
          className={classes.spoiler}
          onChange={(event) => {
            showList(event.target.value);
          }}
          render={render}
        />
      </div>
    );
  },
);

export default Field;
