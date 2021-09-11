/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import classNames from 'classnames';

import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';

export default function Field({
  classes,
  placeholder,
  currentLabel,
  showList,
  listShown,
  render,
}) {
  const InputTag = render.Input || 'input';

  return (
    <div
      className={classes.header}
      onClick={() => {
        showList(!listShown);
      }}>
      <InputTag
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
        type="spoiler"
        className={classes.spoiler}
        name="select-header-button"
        value={[listShown]}
        valueOptions={[{ label: '', value: true }]}
        onChange={() => {
          showList(!listShown);
        }}
        render={render}
      />
    </div>
  );
}
