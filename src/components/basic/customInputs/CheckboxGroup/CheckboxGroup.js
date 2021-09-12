/* eslint-disable react/no-unused-prop-types */
import React, { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames';
import { includes, isEqual } from 'lodash-es';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import createEvent from '../../../../helpers/formHelpers/createEvent';
import checkboxValueSeparator from '@/formHelpers/checkboxValueSeparator';
import renderTag from '@/formHelpers/renderTag';
import compareObjects from '@/helpers/compareObjects';
import useValueOptions from '@/hooks/useValueOptions';
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
  } = props;
  const [valueOptions, loading] = useValueOptions(options);

  const [checked, setChecked] = useState(
    valueOptions?.filter((f) => includes(values, f)).map((_, index) => index),
  );

  useEffect(() => {
    setChecked(
      valueOptions.filter((f) => includes(values, f)).map((_, index) => index),
    );
  }, [value, valueOptions]);

  useEffect(() => {
    onChange(createEvent(name, commonValue));
  }, [commonValue]);

  const renderCheckbox = useCallback(
    (valueOption, { id, type, name, attributes }, id) => {
      const onChangeHandler = (event) => {
        if (type === 'checkbox' || type === 'toggle' || type === 'spoiler') {
          let { checked, value } = event.target;
          // try {
          //   value = JSON.parse(value);
          // } catch (err) {
          //   value = value;
          // }
          if (checked) {
            values.push(value);
          } else {
            values.splice(values.indexOf(value), 1);
          }
          if (!values.length) {
            values = null;
          }
          // eslint-disable-next-line no-param-reassign
          event.target.value = values;
        }
        setCommonValue(values);
        console.log(9);
      };

      const Input = renderTag(render, 'Input');
      const Label = renderTag(render, 'Label');

      return (
        <div
          key={id + valueOption.value}
          className={classNames(className, classes[`${type}Fieldset`])}>
          <Input
            id={id + valueOption.value}
            name={name}
            type={
              type === 'checkbox' || type === 'toggle' || type === 'spoiler'
                ? 'checkbox'
                : 'radio'
            }
            className={classNames(classes[type], {
              [classes.required]: required,
            })}
            value={valueOption.value}
            onChange={onChangeHandler}
            {...attributes}
            checked={
              checked.includes(id)
            }
          />
          <Label htmlFor={id + valueOption.value}>{valueOption.label}</Label>
        </div>
      );
    },
    [checked],
  );

  function renderCheckboxes() {
    if (loading) {
      if (render.Loader) {
        return render.Loader(14);
      }

      return 'Loading...';
    }

    if (!valueOptions) {
      return renderEmptyCheckbox();
    }

    return valueOptions.map((valueOption) =>
      renderCheckbox(valueOption, props),
    );
  }

  function renderEmptyCheckbox() {
    return renderCheckbox({ value: true }, props);
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
  value: null,
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
  type: PropTypes.oneOf(['radio', 'checkbox', 'toggle', 'spoiler']).isRequired,

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
