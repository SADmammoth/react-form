import React, { Fragment, useEffect, useState } from 'react';
import { Theme, useInputsComponents } from '../../src';

const Form = () => {
  const { Inputs, formProps } = useInputsComponents({
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
  return (
    <Theme>
      <form {...formProps}>
        <Inputs.Text />
        <Inputs.Number />
        <Inputs.Checkbox />
        <Inputs.CheckboxGroup />
        <button type="submit">Submit</button>
      </form>
    </Theme>
  );
};

export default Form;
