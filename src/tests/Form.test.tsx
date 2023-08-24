import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { IFormProps } from '../types/IFormProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { ValueDisplayStyle } from '../types/InputsProps/atomic/ValueDisplayStyle';
import { StarSliderSegment } from './helpers/StarSliderSegment';
import TestForm from './helpers/TestForm';
import { countriesStatic } from './helpers/countries';

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
  radioGroupRequired: {
    type: InputType.RadioGroup,
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
  rating: {
    type: InputType.SegmentedSlider,
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
  file: {
    type: InputType.File,
    label: 'File',
    allowMultiple: true,
    accept: '.log',
  },
  image: {
    type: InputType.Image,
    label: 'Image',
  },
};

test('All inputs displaying', async () => {
  render(
    <TestForm
      formId="form"
      inputs={INPUTS}
      onSubmit={async (data) => {
        console.log(data);
      }}
    />,
  );
  waitFor(
    () => {
      const allInputs = screen.getAllByRole('input');
      expect(allInputs.length).toBe(Object.values(INPUTS).length);
    },
    { timeout: 1000 },
  );
});
