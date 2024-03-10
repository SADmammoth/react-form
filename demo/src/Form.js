import React, { Fragment, useEffect, useState } from 'react';
import { Theme, useInputsComponents } from '../../src';
import { StarSliderSegment } from './StarSliderSegment';
import { countriesStatic } from './countries';

const Form = () => {
  const { Inputs, formProps } = useInputsComponents({
    inputs: {
      text: {
        type: 'text',
        label: 'Text',
        placeholder: 'Text',
      },
      number: {
        type: 'number',
        label: 'Number',
        placeholder: '1234',
        //FIXME: unable to enter negative and decimal values
        min: 0, // FIXME: min max not working for input on validation on submit
        max: 6,
        step: 2, // FIXME: steps not working
      },
      checkbox: {
        type: 'checkbox',
        label: 'Checkbox',
      },
      checkboxGroup: {
        type: 'checkbox-group',
        label: 'Checkbox Group',
        valueOptions: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
          {
            label: 'Option 3',
            value: '3',
          },
        ],
        value: [
          {
            label: 'Option 3',
            value: '1',
          },
          {
            label: 'Option 3',
            value: '3',
          },
        ],
      },
      radioGroup: {
        type: 'radio-group',
        label: 'Radio Group',
        valueOptions: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
          {
            label: 'Option 3',
            value: '3',
          },
        ],
        value: {
          label: 'Option 3',
          value: '3',
        },
      },
      radioGroupRequired: {
        type: 'radio-group',
        label: 'Radio Group Required',
        required: true,
        valueOptions: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
          {
            label: 'Option 3',
            value: '3',
          },
        ],
      },
      slider: {
        type: 'slider',
        label: 'Slider',
        valueOptions: {
          from: 1,
          to: 3.6,
          step: 0.1,
          labelCalculator: (i) => {
            return String.fromCharCode(97 + ((i - 1) / 2.6) * 26);
          },
        },
        valueDisplayStyle: 'HIDE_ALL',
      },
      rating: {
        type: 'segmented-slider',
        label: 'Rating',
        valueOptions: {
          from: 1,
          to: 6,
          step: 1,
          labelCalculator: (i) => {
            if (i === 1) {
              return '1 star';
            }
            return `${i} stars`;
          },
        },
        segment: StarSliderSegment,
      },
      range: {
        type: 'range',
        label: 'Range',
        valueOptions: {
          from: 1,
          to: 6,
          step: 1,
          labelCalculator: (i) => {
            if (i === 1) {
              return '1 star';
            }
            return `${i} stars`;
          },
        },
        segmentScale: 0.1,
      },
      select: {
        type: 'select',
        label: 'Select',
        placeholder: 'Click to select option',
        valueOptions: countriesStatic(),
      },
      search: {
        type: 'search',
        label: 'Search',
        placeholder: 'Type here to search...',
        valueOptions: countriesStatic(),
        restrictedToOptions: true,
      },
      file: {
        type: 'file',
        label: 'File',
        allowMultiple: true,
        accept: '.log',
      },
      image: {
        type: 'image',
        label: 'Image',
      },
      customTextArea: {
        type: 'custom-textarea',
        label: 'Custom Text Area',
        macrosCollection: {
          header1: {
            openingCommand: '#',
            commandEffect: {
              type: 'custom-input',
              input: (ref, onInput, onChange, initialValue) => {
                return (
                  <h1>
                    <input
                      ref={ref}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          console.log('ENTER');
                          onChange(event.target.value + '\n ', true);
                          event.preventDefault();
                          // FIXME Close already closed input
                        }
                        if (event.key === '#') {
                          console.log('#');
                          event.preventDefault();
                          onChange(event.target.value + '#', true);
                          return;
                        }
                        onInput(event.target.value);
                      }}
                      defaultValue={initialValue}
                      onBlur={(event) => {
                        // console.log('Blur');
                        // onChange(event.target.value + '\n ', false);
                      }}
                    />
                  </h1>
                );
              },
            },
          },
          // bold_simple: {
          //   openingCommand: '*',
          //   commandEffect: {
          //     type: 'text-input',
          //     wrapper: 'b',
          //   },
          // },
          bold: {
            openingCommand: '*',
            commandEffect: {
              type: 'nested-block',
              wrapper: 'b',
              macrosCollection: ({ bold, ...rest }) => rest,
            },
          },
          boldbold: {
            openingCommand: '**',
            commandEffect: {
              type: 'nested-block',
              wrapper: 'b',
              macrosCollection: ({ boldbold, ...rest }) => rest,
            },
          },
          boldboldbold: {
            openingCommand: '***',
            commandEffect: {
              type: 'nested-block',
              wrapper: 'b',
              macrosCollection: ({ boldboldbold, ...rest }) => rest,
            },
          },
          italic: {
            openingCommand: '_',
            commandEffect: {
              type: 'nested-block',
              wrapper: 'i',
              macrosCollection: ({ italic, ...rest }) => rest,
            },
          },
          something: {
            openingCommand: '//',
            commandEffect: {
              type: 'text-input',
              wrapper: 'span',
              closingCommands: ['//', 'ArrowUp'],
            },
          },
        },
      },
    },
    formId: 'form',
    onSubmit: async (data) => {
      console.log(data);
    },
  });

  return (
    <Theme>
      <form {...formProps}>
        {Inputs.CustomTextArea}
        <button type="submit">Submit</button>
      </form>
    </Theme>
  );
};

export default Form;
