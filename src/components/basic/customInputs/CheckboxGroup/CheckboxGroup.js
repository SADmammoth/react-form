/* eslint-disable react/no-unused-prop-types */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { includes, isEqual } from 'lodash-es';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import Toggle from '../Toggle';
import createEvent from '@/formHelpers/createEvent';
import compareObjects from '@/helpers/compareObjects';
import useFetchedProps from '@/hooks/useFetchedProps';
import theme from '@/styles/theme';

import styles from './CheckboxGroup.styles';

const useStyles = createUseStyles(styles);

function CheckboxGroup(props) {
  const classes = useStyles(theme);

  const {
    valueOptions: options,
    render,
    required,
    className,
    name,
    value,
    onChange,
    disabled,
  } = props;
  const [valueOptions, loading] = useFetchedProps(options);

  const renderCheckbox = useCallback(
    (valueOption, { id, type: groupType, name, attributes }) => {
      const type = groupType.replace('-group', '');

      const onChangeHandler = (checked, checkboxValue, name) => {
        let currentValue = value || [];
        if (checked) {
          onChange(createEvent(name, [...currentValue, checkboxValue]));
        } else {
          let copy = [...currentValue];
          copy.splice(copy.indexOf(checkboxValue), 1);
          onChange(createEvent(name, copy));
        }
      };

      return (
        <Toggle
          key={id + valueOption.label}
          id={id}
          value={valueOption.value}
          name={name}
          type={type}
          className={className}
          onChange={onChangeHandler}
          attributes={attributes}
          label={valueOption.label}
          checked={includes(value, valueOption.value)}
          required={required}
          render={render}
          disabled={disabled}
        />
      );
    },
    [value],
  );

  function renderCheckboxes() {
    if (loading) {
      if (render.Loader) {
        return render.Loader(14);
      }

      return 'Loading...';
    }

    return valueOptions.map((valueOption) =>
      renderCheckbox(valueOption, props),
    );
  }

  const { type, id } = props;

  return (
    <div id={id + type} className={classes[`${type}Group`]}>
      {renderCheckboxes()}
    </div>
  );
}

CheckboxGroup.defaultProps = {
  className: '',
  value: [],
  onInput: () => {},
  onChange: () => {},
  required: false,
  attributes: null,
  description: null,
  valueOptions: null,
};

CheckboxGroup.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'radio-group',
    'checkbox-group',
    'toggle-group',
    'spoiler-group',
  ]).isRequired,

  // Array of strings for checkbox and string for radio
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  // List of buttons values in group
  valueOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    PropTypes.func,
  ]),
  description: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  attributes: PropTypes.objectOf(PropTypes.string),
  render: PropTypes.shape({
    Label: PropTypes.any,
    Loader: PropTypes.func,
    Input: PropTypes.any,
  }),
};

export default React.memo(CheckboxGroup, compareObjects);
