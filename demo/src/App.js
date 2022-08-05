import React, { Fragment, useState } from 'react';
import { useInputs } from '../../src';
import TestInput from '../../src/inputs/TestInput';

const App = () => {
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
    <Fragment>
      <form {...formProps}>
        <TestInput {...inputs.one} />
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  );
};

export default App;
