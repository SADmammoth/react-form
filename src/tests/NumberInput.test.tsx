import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IFormProps } from '../types/IFormProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { testForm } from './helpers/formTests';

type InputsPropsType = IFormProps<InputsProps>['inputs'];

describe('Number input', () => {
  test('Placeholder and label display correctly', async () => {
    const INPUTS: InputsPropsType = {
      number: {
        type: InputType.Number,
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
      number: {
        type: InputType.Number,
        label: 'Test Label',
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    await userEvent.click(input);
    await userEvent.type(input, '541');
    await userEvent.click(container);

    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        number: 541,
      });
    });
  });

  test('Correctly displays the value', async () => {
    const INPUTS: InputsPropsType = {
      number: {
        type: InputType.Text,
        label: 'Test Label',
      },
    };

    const {
      formData: { container },
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    await userEvent.click(input);
    await userEvent.type(input, '541');
    await userEvent.click(container);

    expect(input).toHaveValue('541');
  });

  test('Default value sets correctly', async () => {
    const INPUTS: InputsPropsType = {
      number: {
        type: InputType.Number,
        label: 'Test Label',
        value: 111122223333,
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    expect(input).toHaveValue('111122223333');

    await testSubmit(async (data) =>
      expect(data).toMatchObject({ number: 111122223333 }),
    );
  });

  test('Default value updates correctly', async () => {
    const INPUTS: InputsPropsType = {
      number: {
        type: InputType.Number,
        label: 'Test Label',
        value: 111122223333,
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    await userEvent.click(input);
    await userEvent.type(input, '4444');
    await userEvent.click(container);

    expect(input).toHaveValue('1111222233334444');

    await testSubmit(async (data) =>
      expect(data).toMatchObject({ number: 1111222233334444 }),
    );
  });

  test('Prevents form submition if required and no default value', async () => {
    const INPUTS: InputsPropsType = {
      number: {
        type: InputType.Number,
        label: 'Test Label',
        required: true,
      },
    };

    testForm(INPUTS).expectNoSubmit();
  });

  test('If required, form submits with provided default value', async () => {
    const INPUTS: InputsPropsType = {
      number: {
        type: InputType.Number,
        label: 'Test Label',
        required: true,
        value: 111122223333,
      },
    };

    await testForm(INPUTS).testSubmit(async (data) =>
      expect(data).toMatchObject({ number: 111122223333 }),
    );
  });
});

describe('Multiple Number Inputs', () => {
  test('Correctly saves the value', async () => {
    const INPUTS: InputsPropsType = {
      number1: {
        type: InputType.Number,
        label: 'Test Label 1',
      },
      number2: {
        type: InputType.Number,
        label: 'Test Label 2',
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input1 = await screen.findByLabelText('Test Label 1');

    await userEvent.click(input1);
    await userEvent.type(input1, '1111');

    const input2 = await screen.findByLabelText('Test Label 2');
    await userEvent.click(input2);
    await userEvent.type(input2, '2222');
    await userEvent.click(container);

    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        number1: 1111,
        number2: 2222,
      });
    });
  });

  test('Correctly displays the value', async () => {
    const INPUTS: InputsPropsType = {
      number1: {
        type: InputType.Number,
        label: 'Test Label 1',
      },
      number2: {
        type: InputType.Number,
        label: 'Test Label 2',
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input1 = await screen.findByLabelText('Test Label 1');

    await userEvent.click(input1);
    await userEvent.type(input1, '1111');
    expect(input1).toHaveValue('1111');

    const input2 = await screen.findByLabelText('Test Label 2');
    await userEvent.click(input2);
    await userEvent.type(input2, '2222');
    await userEvent.click(container);
    expect(input2).toHaveValue('2222');

    expect(input1).toHaveValue('1111');
  });

  test('Default value sets correctly', async () => {
    const INPUTS: InputsPropsType = {
      number1: {
        type: InputType.Number,
        label: 'Test Label 1',
        value: 1111,
      },
      number2: {
        type: InputType.Number,
        label: 'Test Label 2',
        value: 2222,
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input1 = await screen.findByLabelText('Test Label 1');
    expect(input1).toHaveValue('1111');
    const input2 = await screen.findByLabelText('Test Label 2');
    expect(input2).toHaveValue('2222');

    await testSubmit(async (data) =>
      expect(data).toMatchObject({
        number1: 1111,
        number2: 2222,
      }),
    );
  });

  test('Default value updates correctly (both)', async () => {
    const INPUTS: InputsPropsType = {
      number1: {
        type: InputType.Number,
        label: 'Test Label 1',
        value: 1111,
      },
      number2: {
        type: InputType.Number,
        label: 'Test Label 2',
        value: 2222,
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input1 = await screen.findByLabelText('Test Label 1');
    await userEvent.click(input1);
    await userEvent.type(input1, '3333');
    await userEvent.click(container);

    expect(input1).toHaveValue('11113333');

    const input2 = await screen.findByLabelText('Test Label 2');
    await userEvent.click(input2);
    await userEvent.type(input2, '4444');
    await userEvent.click(container);

    expect(input2).toHaveValue('22224444');
    expect(input1).toHaveValue('11113333');

    await testSubmit(async (data) =>
      expect(data).toMatchObject({
        number1: 11113333,
        number2: 22224444,
      }),
    );
  });

  test('Default value updates correctly (single)', async () => {
    const INPUTS: InputsPropsType = {
      number1: {
        type: InputType.Number,
        label: 'Test Label 1',
        value: 1111,
      },
      number2: {
        type: InputType.Number,
        label: 'Test Label 2',
        value: 2222,
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input1 = await screen.findByLabelText('Test Label 1');
    await userEvent.click(input1);
    await userEvent.type(input1, '3333');
    await userEvent.click(container);

    const input2 = await screen.findByLabelText('Test Label 2');
    expect(input1).toHaveValue('11113333');
    expect(input2).toHaveValue('2222');

    await testSubmit(async (data) =>
      expect(data).toMatchObject({
        number1: 11113333,
        number2: 2222,
      }),
    );
  });
});
