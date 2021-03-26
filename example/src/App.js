import React, { useState, Fragment, useEffect } from 'react';

import Form from 'react-form';

const App = () => {
  const [file, setFile] = useState([]);
  useEffect(() => {
    async function loadFile(name) {
      setFile(await (await fetch(name)).json());
    }

    loadFile('./inputs.json');
  }, []);

  const [inputs, setInputs] = useState([]);
  const NewForm = Form.default;
  return (
    <Fragment>
      <NewForm
        onSubmit={async (data) => {
          console.log(data);
        }}
        inputs={[
          {
            type: 'text',
            name: 'shortText',
            placeholder: 'Short text (5-50 chars)',
            label: 'Short text',
            required: true,
          },
          {
            type: 'textarea',
            name: 'fullText',
            placeholder: 'Full text',
            label: 'Full text',
            minSymbols: 5,
            maxSymbols: 1000,
            required: true,
          },
          {
            type: 'text',
            name: 'dateTime',
            label: 'Date and time',
            placeholder: 'MM-dd-yyyy hh:mm',
            validator: 'dateTimeByCharWithInvisibleMask',
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
          Input: (props) => {
            if (props.type === 'textarea') {
              return (
                <textarea key={props.key} data-custom='custom' {...props} />
              );
            } else {
              return <input key={props.key} data-custom='custom' {...props} />;
            }
          },
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
      </NewForm>
      <Form.MarkdownOutput
        id='markdownOutput'
        name='markdownOutput'
        value='ss**ss**ss'
      />
    </Fragment>
  );
};

export default App;
