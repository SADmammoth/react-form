import React, { Fragment, useState } from 'react';
import {TextInput} from '../../src';
import { withValueState } from '../../src/inputs/withValueState';
import Form from './Form';

const App = () => {
  const Inp = withValueState(TextInput);

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
