import React, { Fragment, useState } from 'react';
import TextInput from '../../src/inputs/TextInput';
import { withValueState } from '../../src/inputs/withValueState';
import Form from './Form';

const App = () => {
  const Inp = withValueState(TextInput);

  return (
    <Fragment>
      <div style={{ paddingBottom: '200px' }}>
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
      </div>
    </Fragment>
  );
};

export default App;
