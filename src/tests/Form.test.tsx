import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { IFormProps } from '../types/IFormProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { ValueDisplayStyle } from '../types/InputsProps/atomic/ValueDisplayStyle';
import { StarSliderSegment } from './helpers/StarSliderSegment';
import TestForm from './helpers/TestForm';
import { countriesStatic } from './helpers/countries';
import { testForm } from './helpers/formTests';

const INPUTS: IFormProps<InputsProps>['inputs'] = {
  text: {
    type: InputType.Text,
    label: 'Text',
    placeholder: 'Text',
  },
  number: {
    type: InputType.Number,
    label: 'Number',
    placeholder: '1234',
  },
  checkbox: {
    type: InputType.Checkbox,
    label: 'Checkbox',
  },
  checkboxGroup: {
    type: InputType.CheckboxGroup,
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
        value: '3',
      },
    ],
  },
  radioGroup: {
    type: InputType.RadioGroup,
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
  slider: {
    type: InputType.Slider,
    label: 'Slider',
    valueOptions: {
      from: 1,
      to: 3.6,
      step: 0.1,
      labelCalculator: (i) => {
        return String.fromCharCode(97 + ((i - 1) / 2.6) * 26);
      },
    },
    valueDisplayStyle: ValueDisplayStyle.HideAll,
  },
  range: {
    type: InputType.Range,
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
  },
  select: {
    type: InputType.Select,
    label: 'Select',
    placeholder: 'Click to select option',
    valueOptions: countriesStatic(),
  },
  search: {
    type: InputType.Search,
    label: 'Search',
    placeholder: 'Type here to search...',
    valueOptions: countriesStatic(),
    restrictedToOptions: true,
  },
};

describe('Form tests', () => {
  test('All inputs displaying', async () => {
    testForm(INPUTS);

    const allInputs = screen.getAllByRole('input');
    expect(allInputs.length).toBe(Object.values(INPUTS).length);
  });

  test('Form data contains all fields on submit', async () => {
    await testForm(INPUTS).testSubmit(async (data) => {
      expect(Object.keys(data).sort()).toEqual(Object.keys(INPUTS).sort());
    });
  });
});
