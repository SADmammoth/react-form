import React, { useState, Fragment, useEffect } from 'react';

import _ from 'lodash-es';
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
            type: 'text',
            name: 'date2',
            id: 'date2',

            converters: {
              in: (e) => e?.text,
              out: (value) => {
                return { text: value };
              },
            },
            actionButton: {
              label: 'Clear',
              action: async (name, value) => {
                return '';
              },
            },
            required: true,
          },
          // {
          //   type: 'image-multiple',
          //   name: 'date',
          //   id: 'date',
          //   value: [
          //     {
          //       url: 'blob:http://localhost:3000/972a0940-ad65-4b62-b498-34242d6923c0',
          //       fileName: 'coffee2_2.tif',
          //       fileSize: 28415188,
          //     },
          //   ],
          // },
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
