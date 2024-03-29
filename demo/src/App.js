import React, { Fragment, useState } from 'react';
import Form from '../../src';
import Button from './Button';
import Input from './Input';
import Option from './Option';
import inputsProps from './inputs';

const App = () => {
  const [inputs, setInputs] = useState({});
  return (
    <Fragment>
      <Form
        id="form"
        onSubmit={async (data) => {
          console.log(data);
        }}
        resetOnSubmit={true}
        persistFormData={true}
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
          Option,
          Button,
        }}
        onInputsUpdate={(inputs) => {
          console.log(inputs);
          setInputs(inputs);
        }}
        notify={(...args) => console.log(args)}
        // markdownFeatures={{
        //   headings: true,
        //   links: true,
        //   bold: true,
        //   italic: true,
        // }}
      >
        {inputs.$list}
      </Form>
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
