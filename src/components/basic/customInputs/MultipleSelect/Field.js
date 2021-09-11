/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import classNames from 'classnames';

import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import createEvent from '@/formHelpers/createEvent';
import DefaultTag from '@/generic/Tag';

export default function Field({
  classes,
  name,
  placeholder,
  currentLabel,
  showList,
  listShown,
  setCurrentLabel,
  render,
  onChange,
}) {
  const InputTag = render.Input || 'input';
  const Tag = render.Tag || DefaultTag;

  return (
    <div className={classes.header}>
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
        <InputTag
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
