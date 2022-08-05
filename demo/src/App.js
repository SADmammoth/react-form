import React, { Fragment, useState } from 'react';
import { useInputs } from '../../src';
import TestInput from '../../src/inputs/TestInput';
import { withValueState } from '../../src/inputs/withValueState';
import Form from './Form';

const App = () => {
  const Inp = withValueState(TestInput);

  return (
    <Fragment>
      <Form />
      <Inp
        label="Der"
        name="name"
        type="checkbox"
        value="der"
        onChange={(value) => {
          console.log('OnChange', value);
        }}
      />
    </Fragment>
  );
};

export default App;
