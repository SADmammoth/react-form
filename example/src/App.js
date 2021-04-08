import React, { useState, Fragment, useEffect } from 'react';

import Form from 'react-form';
import Input from './Input';

import 'react-form/dist/index.css';

const App = () => {
  const [file, setFile] = useState([]);
  useEffect(() => {
    async function loadFile(name) {
      setFile(await (await fetch(name)).json());
    }

    loadFile('./inputs.json');
  }, []);

  const [inputs, setInputs] = useState({});
  return (
    <Fragment>
      <Form
        onSubmit={async (data) => {
          console.log(data);
        }}
        inputs={[
          {
            id: 'shortText',
            type: 'text',
            name: 'shortText',
            placeholder: 'Short text (5-50 chars)',
            label: 'Short text',
            required: true,
          },
          {
            id: 'fullText',
            type: 'textarea',
            name: 'fullText',
            placeholder: 'Full text',
            label: 'Full text',
            minSymbols: 5,
            maxSymbols: 1000,
            required: true,
          },
          {
            id: 'dateTime',
            type: 'text',
            name: 'dateTime',
            label: 'Date and time',
            placeholder: 'MM-dd-yyyy hh:mm',
            validator: 'dateTimeByCharWithInvisibleMask',
          },
          ...file,
        ]}
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
            return <label data-custom='custom' {...props} />;
          },
        }}
        onInputsUpdate={(inputs) => {
          setInputs(inputs);
        }}
        notify={(...args) => console.log(args)}
      >
        {inputs.$list}
      </Form>

      <Form.MarkdownOutput
        id='markdownOutput'
        name='markdownOutput'
        value='ss**ss**ss'
      />
    </Fragment>
  );
};

export default App;
