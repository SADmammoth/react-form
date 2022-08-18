import React, { Fragment, useState } from 'react';
import { useInputs } from '../../src';
import TextInput from '../../src/inputs/TextInput';

const Form = () => {
  const { inputs, formProps } = useInputs({
    inputs: {
      one: {
        type: 'text',
        label: 'Label',
        placeholder: 'Label',
      },
    },
    formId: 'form',
    onSubmit: async (data) => {
      console.log(data);
    },
  });

  return (
    <form {...formProps}>
      <TextInput {...inputs.one} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
