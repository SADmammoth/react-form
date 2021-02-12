import React, { useState, Fragment, useEffect } from 'react';

import Form, { MarkdownOutput, Spinner } from 'react-form';
import 'react-form/dist/index.css';

const App = () => {
  const [file, setFile] = useState([]);
  useEffect(() => {
    async function loadFile(name) {
      setFile(await (await fetch(name)).json());
    }

    loadFile('./inputs.json');
  }, []);

  return (
    <Fragment>
      <Form
        onSubmit={async (data) => {
          console.log(data);
        }}
        inputs={[
          ...file,
          {
            type: 'checkbox',
            name: 'checkboxes',
            valueOptions: function () {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve([{ value: 'val', label: 'label' }]);
                }, 1000);
              });
            },
            required: false,
            label: 'Checkboxes',
          },
          {
            type: 'select',
            name: 'list',
            placeholder: 'List',
            valueOptions: function () {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve([{ value: 'val', label: 'label' }]);
                }, 10000);
              });
            },
            required: true,
          },
        ]}
        style={{ width: '20vw', margin: '0 auto' }}
        submitButton={<button>Submit</button>}
        renderLoader={(size, centered) => (
          <>
            <Spinner size={size} centered={centered}></Spinner>
            <span>Loading...</span>
          </>
        )}
        notify={(...args) => console.log(args)}
      />
      <MarkdownOutput
        id="markdownOutput"
        name="markdownOutput"
        value="ss**ss**ss"
      />
    </Fragment>
  );
};

export default App;
