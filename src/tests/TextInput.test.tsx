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

    expect(await screen.findByLabelText('Test Label')).not.toBeNull();
    expect(
      await screen.findByPlaceholderText('Test Placeholder'),
    ).not.toBeNull();
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
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    await userEvent.click(input);
    await userEvent.type(input, 'Test Test');
    await userEvent.click(container);

    expect(input).toHaveValue('Test Test');
  });

  test('Default value sets correctly', async () => {
    const INPUTS: InputsPropsType = {
      text: {
        type: InputType.Text,
        label: 'Test Label',
        value: 'Default Value',
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    expect(input).toHaveValue('Default Value');

    await testSubmit(async (data) =>
      expect(data).toMatchObject({ text: 'Default Value' }),
    );
  });

  test('Default value updates correctly', async () => {
    const INPUTS: InputsPropsType = {
      text: {
        type: InputType.Text,
        label: 'Test Label',
        value: 'Default Value',
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    await userEvent.click(input);
    await userEvent.type(input, ' Update');
    await userEvent.click(container);

    expect(input).toHaveValue('Default Value Update');

    await testSubmit(async (data) =>
      expect(data).toMatchObject({ text: 'Default Value Update' }),
    );
  });

  test('Prevents form submition if required and no default value', async () => {
    const INPUTS: InputsPropsType = {
      text: {
        type: InputType.Text,
        label: 'Test Label',
        required: true,
      },
    };

    testForm(INPUTS).expectNoSubmit();
  });

  test('If required, form submits with provided default value', async () => {
    const INPUTS: InputsPropsType = {
      text: {
        type: InputType.Text,
        label: 'Test Label',
        required: true,
        value: 'Default Value',
      },
    };

    await testForm(INPUTS).testSubmit(async (data) =>
      expect(data).toMatchObject({ text: 'Default Value' }),
    );
  });
});

describe('Multiple Text Inputs', () => {
  test('Correctly saves the value', async () => {
    const INPUTS: InputsPropsType = {
      text1: {
        type: InputType.Text,
        label: 'Test Label 1',
      },
      text2: {
        type: InputType.Text,
        label: 'Test Label 2',
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input1 = await screen.findByLabelText('Test Label 1');

    await userEvent.click(input1);
    await userEvent.type(input1, 'First First');

    const input2 = await screen.findByLabelText('Test Label 2');
    await userEvent.click(input2);
    await userEvent.type(input2, 'Second Second');
    await userEvent.click(container);

    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        text1: 'First First',
        text2: 'Second Second',
      });
    });
  });

  test('Correctly displays the value', async () => {
    const INPUTS: InputsPropsType = {
      text1: {
        type: InputType.Text,
        label: 'Test Label 1',
      },
      text2: {
        type: InputType.Text,
        label: 'Test Label 2',
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input1 = await screen.findByLabelText('Test Label 1');

    await userEvent.click(input1);
    await userEvent.type(input1, 'First First');
    expect(input1).toHaveValue('First First');

    const input2 = await screen.findByLabelText('Test Label 2');
    await userEvent.click(input2);
    await userEvent.type(input2, 'Second Second');
    await userEvent.click(container);
    expect(input2).toHaveValue('Second Second');

    expect(input1).toHaveValue('First First');
  });

  test('Default value sets correctly', async () => {
    const INPUTS: InputsPropsType = {
      text1: {
        type: InputType.Text,
        label: 'Test Label 1',
        value: 'Default Value 1',
      },
      text2: {
        type: InputType.Text,
        label: 'Test Label 2',
        value: 'Default Value 2',
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input1 = await screen.findByLabelText('Test Label 1');
    expect(input1).toHaveValue('Default Value 1');
    const input2 = await screen.findByLabelText('Test Label 2');
    expect(input2).toHaveValue('Default Value 2');

    await testSubmit(async (data) =>
      expect(data).toMatchObject({
        text1: 'Default Value 1',
        text2: 'Default Value 2',
      }),
    );
  });

  test('Default value updates correctly (both)', async () => {
    const INPUTS: InputsPropsType = {
      text1: {
        type: InputType.Text,
        label: 'Test Label 1',
        value: 'Default Value 1',
      },
      text2: {
        type: InputType.Text,
        label: 'Test Label 2',
        value: 'Default Value 2',
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input1 = await screen.findByLabelText('Test Label 1');
    await userEvent.click(input1);
    await userEvent.type(input1, ' Update 1');
    await userEvent.click(container);

    expect(input1).toHaveValue('Default Value 1 Update 1');

    const input2 = await screen.findByLabelText('Test Label 2');
    await userEvent.click(input2);
    await userEvent.type(input2, ' Update 2');
    await userEvent.click(container);

    expect(input2).toHaveValue('Default Value 2 Update 2');
    expect(input1).toHaveValue('Default Value 1 Update 1');

    await testSubmit(async (data) =>
      expect(data).toMatchObject({
        text1: 'Default Value 1 Update 1',
        text2: 'Default Value 2 Update 2',
      }),
    );
  });

  test('Default value updates correctly (single)', async () => {
    const INPUTS: InputsPropsType = {
      text1: {
        type: InputType.Text,
        label: 'Test Label 1',
        value: 'Default Value 1',
      },
      text2: {
        type: InputType.Text,
        label: 'Test Label 2',
        value: 'Default Value 2',
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input1 = await screen.findByLabelText('Test Label 1');
    await userEvent.click(input1);
    await userEvent.type(input1, ' Update 1');
    await userEvent.click(container);

    const input2 = await screen.findByLabelText('Test Label 2');
    expect(input1).toHaveValue('Default Value 1 Update 1');
    expect(input2).toHaveValue('Default Value 2');

    await testSubmit(async (data) =>
      expect(data).toMatchObject({
        text1: 'Default Value 1 Update 1',
        text2: 'Default Value 2',
      }),
    );
  });
});
