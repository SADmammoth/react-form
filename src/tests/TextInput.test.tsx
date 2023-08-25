import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IFormProps } from '../types/IFormProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import TestForm from './helpers/TestForm';
import { testForm } from './helpers/formTests';

type InputsPropsType = IFormProps<InputsProps>['inputs'];

describe('Text input', () => {
  test('Placeholder and label display correctly', async () => {
    const INPUTS: InputsPropsType = {
      text: {
        type: InputType.Text,
        label: 'Test Label',
        placeholder: 'Test Placeholder',
      },
    };

    testForm(INPUTS);

    expect(await screen.findByLabelText('Test Label')).toBeValid();
    expect(await screen.findByPlaceholderText('Test Placeholder')).toBeValid();
  });

  test('Correctly saves the value', async () => {
    const INPUTS: InputsPropsType = {
      text: {
        type: InputType.Text,
        label: 'Test Label',
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    await userEvent.click(input);
    await userEvent.type(input, 'Test Test');
    await userEvent.click(container);

    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        text: 'Test Test',
      });
    });
  });

  test('Correctly displays the value', async () => {
    const INPUTS: InputsPropsType = {
      text: {
        type: InputType.Text,
        label: 'Test Label',
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    await userEvent.click(input);
    await userEvent.type(input, 'Test Test');
    await userEvent.click(container);

    expect(input).toHaveValue('Test Test');
  });
});
