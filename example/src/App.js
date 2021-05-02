import React, { useState, Fragment, useEffect } from 'react';

import Form, { Validator, DateMaskConverters } from 'react-form';
import Input from './Input';
import Option from './Option';

import 'react-form/dist/index.css';
import countries from './countries';

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
            type: 'text',
            name: 'date',
            id: 'date',
            validator: 'dateTimeByCharWithVisibleMask',
            converters: 'dateTime',
          },
          {
            type: 'text',
            name: 'date',
            id: 'date',
            validator: 'dateTimeByCharWithVisibleMask',
          },
          {
            type: 'select-multiple',
            name: 'countries',
            id: 'countries',
            valueOptions: countries,
          },
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
          Option,
        }}
        onInputsUpdate={(inputs) => {
          setInputs(inputs);
        }}
        notify={(...args) => console.log(args)}
        markdownFeatures={{
          headings: true,
          links: true,
          bold: true,
          italic: true,
        }}
      ></Form>
      {inputs.$list}

      <Form.MarkdownOutput
        id='markdownOutput'
        name='markdownOutput'
        value='ss**ss**ss'
      />
    </Fragment>
  );
};

export default App;
