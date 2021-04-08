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
          {
            type: 'slider',
            name: 'alphabet',
            required: false,
            label: 'Alphabet',
            valueOptions: [
              { label: 'A', value: 'a' },
              { label: 'B', value: 'b' },
              { label: 'C', value: 'c' },
              { label: 'D', value: 'd' },
              { label: 'E', value: 'e' },
              { label: 'F', value: 'f' },
              { label: 'G', value: 'g' },
              { label: 'H', value: 'h' },
              { label: 'I', value: 'i' },
              { label: 'J', value: 'j' },
              { label: 'K', value: 'k' },
              { label: 'L', value: 'l' },
              { label: 'M', value: 'm' },
              { label: 'N', value: 'n' },
              { label: 'O', value: 'o' },
              { label: 'P', value: 'p' },
              { label: 'Q', value: 'q' },
              { label: 'R', value: 'r' },
              { label: 'S', value: 's' },
              { label: 'T', value: 't' },
              { label: 'U', value: 'u' },
              { label: 'V', value: 'v' },
              { label: 'W', value: 'w' },
              { label: 'X', value: 'x' },
              { label: 'Y', value: 'y' },
              { label: 'Z', value: 'z' },
            ],
            alwaysShowTip: true,
          },
          {
            type: 'range',
            name: 'range',
            required: false,
            label: 'Range',
            valueOptions: [
              { label: 'A', value: 'a' },
              { label: 'B', value: 'b' },
              { label: 'C', value: 'c' },
              { label: 'D', value: 'd' },
              { label: 'E', value: 'e' },
              { label: 'F', value: 'f' },
              { label: 'G', value: 'g' },
              { label: 'H', value: 'h' },
              { label: 'I', value: 'i' },
              { label: 'J', value: 'j' },
              { label: 'K', value: 'k' },
              { label: 'L', value: 'l' },
              { label: 'M', value: 'm' },
              { label: 'N', value: 'n' },
              { label: 'O', value: 'o' },
              { label: 'P', value: 'p' },
              { label: 'Q', value: 'q' },
              { label: 'R', value: 'r' },
              { label: 'S', value: 's' },
              { label: 'T', value: 't' },
              { label: 'U', value: 'u' },
              { label: 'V', value: 'v' },
              { label: 'W', value: 'w' },
              { label: 'X', value: 'x' },
              { label: 'Y', value: 'y' },
              { label: 'Z', value: 'z' },
            ],
            alwaysShowTip: true,
          },
          {
            type: 'markdown',
            name: 'md',
            required: false,
            label: 'Markdown',
            markdownFeatures: {
              headings: true,
              links: true,
              bold: true,
              italic: true,
            },
          },
          {
            type: 'markdown',
            name: 'mdOutput',
            required: false,
            label: 'Markdown Output',
            editable: false,
            bind: 'md',
          },
          {
            type: 'number',
            name: 'duration',
            value: 1,
            required: true,
            label: 'Duration, hrs',
            attributes: { min: 1, max: 8, step: 0.5 },
          },
          {
            type: 'select',
            name: 'List',
            label: 'List',
            placeholder: 'List',
            valueOptions: [
              {
                label: 'Var 1',
                value: 'var1',
              },
              {
                label: 'Var 2',
                value: 'var2',
              },
            ],
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
