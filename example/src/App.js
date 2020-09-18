import React, { useState, Fragment } from 'react';

import Form, { MarkdownOutput } from 'react-form';
import 'react-form/dist/index.css';

const App = () => {
  return (
    <>
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
            placeholder: 'Content',
            required: false,
            label: 'Content',
          },
          {
            type: 'radio',
            name: 'radiobuttons',
            valueOptions: [
              {
                value: 'radio1',
                label: 'Radio 1',
              },
              {
                value: 'radio2',
                label: 'Radio 2',
              },
            ],
            required: false,
            label: 'Radios',
          },
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
            type: 'toggle',
            name: 'toggles',
            valueOptions: [
              {
                value: 'toggle1',
                label: 'Toggle 1',
              },
              {
                value: 'toggle2',
                label: 'Toggle 2',
              },
            ],
            required: false,
            label: 'Toggles',
          },
          {
            type: 'spoiler',
            name: 'spoilers',
            valueOptions: [
              {
                value: 'spoiler1',
                label: 'Spoiler 1',
              },
              {
                value: 'spoiler2',
                label: 'Spoiler 2',
              },
            ],
            required: false,
            label: 'Spoilers',
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
            attributes: { min: 1, max: 8, step: 0.5 },
          },
          {
            type: 'slider',
            name: 'alphabet',
            required: false,
            label: 'Alphabet',
            valueOptions: 'qwertyuiopasdfghjklzxcvbnm'
              .split('')
              .sort()
              .map((letter) => ({
                label: letter.toUpperCase(),
                value: letter,
              })),

            alwaysShowTip: true,
          },
          {
            type: 'range',
            name: 'range',
            required: false,
            label: 'Range',
            valueOptions: 'qwertyuiopasdfghjklzxcvbnm'
              .split('')
              .sort()
              .map((letter) => ({
                label: letter.toUpperCase(),
                value: letter,
              })),

            alwaysShowTip: true,
          },
          {
            type: 'markdown',
            name: 'md',
            required: false,
            label: 'Markdown',
          },
          {
            type: 'markdown',
            name: 'mdOutput',
            required: false,
            label: 'Markdown Output',
            editable: false,
            bind: 'md',
          },
        ]}
        style={{ width: '20vw', margin: '0 auto' }}
        submitButton={<button>Submit</button>}
      />
      <MarkdownOutput value="ss**ss**ss" />
    </>
  );
};

export default App;
