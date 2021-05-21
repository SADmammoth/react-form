import React, { useState, Fragment, useEffect } from 'react';

import Form, { Validator, DateMaskConverters } from 'react-form';
import 'react-form/dist/index.css';

import Input from './Input';
import Option from './Option';
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
            type: 'file',
            name: 'date',
            id: 'date',
            accept: 'images/png',
            value: {
              url: 'blob:http://localhost:3000/ccb344d7-fb32-47e4-b4e1-cf19169927e2',
              fileName: 'Filename',
              fileSize: 112122,
            },
          },
          // {
          //   type: 'text',
          //   name: 'date2',
          //   id: 'date2',
          //   group: {
          //     title: 'group',
          //     id: 'group',
          //   },
          // },
          // {
          //   type: 'search',
          //   name: 'countries',
          //   id: 'countries',
          //   valueOptions: countries,
          // },
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
            return <label data-custom="custom" {...props} />;
          },
          Option,
        }}
        onInputsUpdate={(inputs) => {
          console.log(inputs);
          setInputs(inputs);
        }}
        notify={(...args) => console.log(args)}
        markdownFeatures={{
          headings: true,
          links: true,
          bold: true,
          italic: true,
        }}></Form>
      {inputs.$list}

      <Form.MarkdownOutput
        id="markdownOutput"
        name="markdownOutput"
        value="ss**ss**ss"
      />
    </Fragment>
  );
};

export default App;
