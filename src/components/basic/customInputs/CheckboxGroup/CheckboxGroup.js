/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import classNames from 'classnames';
import { includes, isEqual } from 'lodash-es';
import PropTypes from 'prop-types';
import { useTheme, createUseStyles } from 'react-jss';

import checkboxValueSeparator from '@/formHelpers/checkboxValueSeparator';
import useValueOptions from '@/formHelpers/getValueOptions';
import renderTag from '@/formHelpers/renderTag';
import compareObjects from '@/helpers/compareObjects';
import theme from '@/styles/theme';

import styles from './CheckboxGroup.styles';

const useStyles = createUseStyles(styles);

function CheckboxGroup(props) {
  const classes = useStyles(theme);

  const { valueOptions: options, render, required, className } = props;
  const [valueOptions, loading] = useValueOptions(options);

  function renderCheckbox(
    valueOption,
    { value: commonValue, id, type, name, onChange, attributes },
  ) {
    //* 'valueOption' variable is 'value' property of current checkbox
    /*
     * 'commonValue' is value of checkbox group by name, means array or string
     * consists of values of checked checkboxes  */
    const values = checkboxValueSeparator(commonValue);

    const onChangeHandler = (event) => {
      if (type === 'checkbox' || type === 'toggle' || type === 'spoiler') {
        const { checked, value } = event.target;
        if (checked) {
          values.push(value);
        } else {
          values.splice(values.indexOf(value), 1);
        }
        // eslint-disable-next-line no-param-reassign
        event.target.value = values;
      }
      onChange(event);
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
            isEqual(valueOption.value, values === valueOption.value) ||
            includes(values, valueOption.value)
          }
        />
        <Label htmlFor={id + valueOption.value}>{valueOption.label}</Label>
      </div>
    );
  }

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
  value: null,
  onInput: () => {},
  onChange: () => {},
  required: false,
  attributes: null,
  description: null,
};

CheckboxGroup.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['radio', 'checkbox', 'toggle', 'spoiler']).isRequired,

  // String of array for checkbox and string for radio
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
  ]).isRequired,
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
