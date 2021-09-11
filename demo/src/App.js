import React, { useState, Fragment } from 'react';

import Form, { Validator, DateMaskConverters } from '../../src';
import Button from './Button';
import Input from './Input';
import Option from './Option';
import inputsProps from './inputs';

const App = () => {
  // const [inputs, setInputs] = useState({});
  return (
    <Fragment>
      <Form
        onSubmit={async (data) => {
          console.log(data);
        }}
        inputs={inputsProps}
        style={{ width: '20vw', margin: '0 auto' }}
        submitButton={<button>Submit</button>}
        render={{
          Loader: (size, centered) => (
            <>
              <span>Loading...</span>
            </>
          ),
          Input,
          Label: (props) => {
            return <label data-custom="custom" {...props} />;
          },
          Button,
        }}
        onInputsUpdate={(inputs) => {
          console.log(inputs);
          // setInputs(inputs);
        }}
        notify={(...args) => console.log(args)}
        markdownFeatures={{
          headings: true,
          links: true,
          bold: true,
          italic: true,
        }}></Form>
      {/* {inputs.$list} */}
      {/* 
      <Form.MarkdownOutput
        id="markdownOutput"
        name="markdownOutput"
        value="ss**ss**ss"
      /> */}
    </Fragment>
  );
};

export default App;
