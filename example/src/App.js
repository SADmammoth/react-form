import React from 'react';

import Form from 'react-form';
import 'react-form/dist/index.css';

const App = () => {
  return (
    <Form
      onSubmit={async (data) => {
        console.log(data);
      }}
      inputs={[
        {
          type: 'text',
          name: 'title',
          placeholder: 'Title',
          required: true,
          label: 'Title',
        },
        {
          type: 'textarea',
          name: 'content',
          required: false,
          label: 'Content',
        },
        {
          type: 'checkbox',
          name: 'checkboxes',
          valueOptions: function () {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve([{ value: 'val', label: 'label' }]);
              }, 10000);
            });
          },
          required: false,
          label: 'Content',
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
        {
          type: 'number',
          name: 'duration',
          value: 1,
          required: true,
          label: 'Duration, hrs',
          attributes: { min: 1, max: 8 },
        },
      ]}
      style={{ width: '20vw', margin: '0 auto' }}
      submitButton={<button>Submit</button>}
    />
  );
};

export default App;
