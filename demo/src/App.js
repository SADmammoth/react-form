import React, { useState, Fragment } from 'react';

import Form, { Validator, DateMaskConverters } from '../../src';
import Input from './Input';
import Option from './Option';
import countries from './countries';

const App = () => {
  const [file, setFile] = useState([]);

  const [inputs, setInputs] = useState({});
  return (
    <Fragment>
      <Form
        onSubmit={async (data) => {
          console.log(data);
        }}
        inputs={[
          // {
          //   type: 'textarea',
          //   name: 'date2',
          //   id: 'date2',

          //   converters: {
          //     in: (e) => e?.text,
          //     out: (value) => {
          //       return { text: value };
          //     },
          //   },
          //   actionButton: {
          //     label: 'Clear',
          //     action: async (name, value) => {
          //       return '';
          //     },
          //   },
          //   required: true,
          // },
          {
            type: 'image',
            name: 'avatar',
            id: 'avatar',
            label: 'Avatar',
            value: 'https://cdn.fakercloud.com/avatars/aaronkwhite_128.jpg',
          },
          {
            type: 'text',
            name: 'date2',
            id: 'date2',
            group: {
              title: 'group',
              id: 'group',
            },
          },
          // {
          //   type: 'text',
          //   name: 'countries',
          //   id: 'countries',
          //   value: undefined,
          // },
          {
            type: 'search-multiple',
            name: 'countries2',
            id: 'countries2',
            valueOptions: countries,
            value: '',
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
