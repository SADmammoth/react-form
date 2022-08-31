import React, { Fragment, useState } from 'react';
import {
  useInputs,
  useInputsStyles,
  TextInput,
  Theme,
  NumberInput,
  CheckboxInput,
  CheckboxGroupInput,
} from '../../src';

const Form = () => {
  const { inputs, formProps, stylesData } = useInputs({
    inputs: {
      text: {
        type: 'text',
        label: 'Text',
        placeholder: 'Text',
      },
      number: {
        type: 'number',
        label: 'Number',
        placeholder: '1234',
      },
      checkbox: {
        type: 'checkbox',
        label: 'Checkbox',
      },
      checkboxGroup: {
        type: 'checkbox-group',
        label: 'Checkbox Group',
        valueOptions: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
          {
            label: 'Option 3',
            value: '3',
          },
        ],
        value: [
          {
            label: 'Option 3',
            value: '3',
          },
        ],
      },
    },
    formId: 'form',
    onSubmit: async (data) => {
      console.log(data);
    },
  });

  const styles = useInputsStyles(stylesData);

  return (
    <Theme>
      <form {...formProps}>
        <TextInput {...inputs.text} style={styles.text} />
        <NumberInput {...inputs.number} style={styles.number} />
        <CheckboxInput {...inputs.checkbox} style={styles.checkbox} />
        <CheckboxGroupInput
          {...inputs.checkboxGroup}
          style={styles.checkboxGroup}
        />
        <button type="submit">Submit</button>
      </form>
    </Theme>
  );
};

export default Form;
