import React, { Fragment, useEffect, useState } from 'react';
import {
  Theme,
  useInputsComponents,
  InputType,
  ValueDisplayStyle,
} from '../../src';
import { StarSliderSegment } from './StarSliderSegment';

const Form = () => {
  const { Inputs, formProps } = useInputsComponents({
    inputs: {
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
        segmentScale: 0.1,
      },
      select: {
        type: InputType.Select,
        label: 'Select',
        placeholder: 'Click to select option',
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
      search: {
        type: InputType.Search,
        label: 'Search',
        placeholder: 'Type here to search...',
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
        restrictedToOptions: false,
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
        {Inputs.Text}
        {Inputs.Number}
        {Inputs.Checkbox}
        {Inputs.CheckboxGroup}
        {Inputs.RadioGroup}
        {Inputs.RadioGroupRequired}
        {Inputs.Slider}
        {Inputs.Rating}
        {Inputs.Range}
        {Inputs.Select}
        <button type="submit">Submit</button>
      </form>
    </Theme>
  );
};

export default Form;
