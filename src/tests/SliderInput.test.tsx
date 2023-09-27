import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IFormProps } from '../types/IFormProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { ValueDisplayStyle } from '../types/InputsProps/atomic/ValueDisplayStyle';
import TestForm from './helpers/TestForm';
import drag from './helpers/drag';
import { testForm } from './helpers/formTests';
import { clickTheValue, slideTheValue } from './helpers/sliderHelpers';

type InputsPropsType = IFormProps<InputsProps>['inputs'];

describe('Slider input', () => {
  test('Placeholder and label display correctly', async () => {
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: { from: 0, to: 99 },
        valueDisplayStyle: ValueDisplayStyle.ShowValue,
      },
    };

    testForm(INPUTS);

    expect(await screen.findByLabelText('Test Label')).not.toBeNull();
  });

  test('Correctly saves the value (slide)', async () => {
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: { from: 0, to: 99 },
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const sliderThumb = await screen.findByTestId('sliderThumb');
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!sliderThumb || !sliderTrack) return;

    await slideTheValue(sliderThumb, sliderTrack, 0, 10, 99);
    await userEvent.click(container);

    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        slider: {
          label: '10',
          value: '10',
        },
      });
    });
  });

  test('Correctly saves the value (click)', async () => {
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: { from: 0, to: 99 },
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const sliderTrack = await screen.findByTestId('sliderTrack');
    const sliderTrackClickTarget = await screen.findByTestId(
      'sliderTrackClickTarget',
    );
    if (!sliderTrack || !sliderTrackClickTarget) return;

    await clickTheValue(sliderTrack, sliderTrackClickTarget, 20, 99);
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        slider: {
          label: '20',
          value: '20',
        },
      });
    });
    await userEvent.click(container);
    await clickTheValue(sliderTrack, sliderTrackClickTarget, 10, 99);
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        slider: {
          label: '10',
          value: '10',
        },
      });
    });
    await userEvent.click(container);
  });
});
