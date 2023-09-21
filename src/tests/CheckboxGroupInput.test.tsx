import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IFormProps } from '../types/IFormProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import TestForm from './helpers/TestForm';
import { testForm } from './helpers/formTests';

type InputsPropsType = IFormProps<InputsProps>['inputs'];

describe('Checkbox Group input', () => {
  test('Labels display correctly', async () => {
    const INPUTS: InputsPropsType = {
      checkboxGroup: {
        type: InputType.CheckboxGroup,
        label: 'Test Label',
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
    };

    testForm(INPUTS);

    expect(await screen.findByText('Test Label')).not.toBeNull();
    expect(await screen.findByLabelText('Option 1')).not.toBeNull();
    expect(await screen.findByLabelText('Option 2')).not.toBeNull();
    expect(await screen.findByLabelText('Option 3')).not.toBeNull();
  });

  test('Correctly saves the value', async () => {
    const INPUTS: InputsPropsType = {
      checkboxGroup: {
        type: InputType.CheckboxGroup,
        label: 'Test Label',
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
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkboxGroup: undefined,
      });
    });
    const checkbox1 = await screen.findByLabelText('Option 1');
    await userEvent.click(checkbox1);
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkboxGroup: [{ label: 'Option 1', value: '1' }],
      });
    });
    await userEvent.click(checkbox1);
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkboxGroup: [],
      });
    });
    const checkbox2 = await screen.findByLabelText('Option 2');
    await userEvent.click(checkbox2);
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkboxGroup: [{ label: 'Option 2', value: '2' }],
      });
    });
    const checkbox3 = await screen.findByLabelText('Option 3');
    await userEvent.click(checkbox3);
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkboxGroup: [
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ],
      });
    });
  });

  test('Correctly displays the value', async () => {
    const INPUTS: InputsPropsType = {
      checkboxGroup: {
        type: InputType.CheckboxGroup,
        label: 'Test Label',
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
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkboxGroup: undefined,
      });
    });
    const checkbox1 = await screen.findByLabelText('Option 1');
    const checkbox2 = await screen.findByLabelText('Option 2');
    const checkbox3 = await screen.findByLabelText('Option 3');

    await userEvent.click(checkbox1);
    expect(checkbox1).toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).not.toBeChecked();

    await userEvent.click(checkbox1);
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).not.toBeChecked();

    await userEvent.click(checkbox2);
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).toBeChecked();
    expect(checkbox3).not.toBeChecked();

    await userEvent.click(checkbox3);
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).toBeChecked();
    expect(checkbox3).toBeChecked();
  });

  test('Default value sets correctly (single value)', async () => {
    const INPUTS: InputsPropsType = {
      checkboxGroup: {
        type: InputType.CheckboxGroup,
        label: 'Test Label',
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
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const checkbox1 = await screen.findByLabelText('Option 1');
    const checkbox2 = await screen.findByLabelText('Option 2');
    const checkbox3 = await screen.findByLabelText('Option 3');

    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).toBeChecked();
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkboxGroup: [
          {
            label: 'Option 3',
            value: '3',
          },
        ],
      });
    });
  });

  test('Default value sets correctly (multiple values)', async () => {
    const INPUTS: InputsPropsType = {
      checkboxGroup: {
        type: InputType.CheckboxGroup,
        label: 'Test Label',
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
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 3',
            value: '3',
          },
        ],
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const checkbox1 = await screen.findByLabelText('Option 1');
    const checkbox2 = await screen.findByLabelText('Option 2');
    const checkbox3 = await screen.findByLabelText('Option 3');

    expect(checkbox1).toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).toBeChecked();
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkboxGroup: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 3',
            value: '3',
          },
        ],
      });
    });
  });

  test('Default value updates correctly', async () => {
    const INPUTS: InputsPropsType = {
      checkboxGroup: {
        type: InputType.CheckboxGroup,
        label: 'Test Label',
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
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 3',
            value: '3',
          },
        ],
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const checkbox1 = await screen.findByLabelText('Option 1');
    const checkbox2 = await screen.findByLabelText('Option 2');
    const checkbox3 = await screen.findByLabelText('Option 3');

    await userEvent.click(checkbox1);
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).toBeChecked();
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkboxGroup: [
          {
            label: 'Option 3',
            value: '3',
          },
        ],
      });
    });

    await userEvent.click(checkbox1);
    expect(checkbox1).toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).toBeChecked();
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkboxGroup: [
          {
            label: 'Option 3',
            value: '3',
          },
          {
            label: 'Option 1',
            value: '1',
          },
        ],
      });
    });

    await userEvent.click(checkbox2);
    expect(checkbox1).toBeChecked();
    expect(checkbox2).toBeChecked();
    expect(checkbox3).toBeChecked();
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkboxGroup: [
          {
            label: 'Option 3',
            value: '3',
          },
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
        ],
      });
    });

    await userEvent.click(checkbox1);
    await userEvent.click(checkbox2);
    await userEvent.click(checkbox3);
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).not.toBeChecked();
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkboxGroup: [],
      });
    });
  });

  test('If required, form submits if default value set', async () => {
    const INPUTS: InputsPropsType = {
      checkboxGroup: {
        type: InputType.CheckboxGroup,
        label: 'Test Label',
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
        value: [
          {
            label: 'Option 3',
            value: '3',
          },
        ],
      },
    };

    const {
      formData: { container },
      expectNoSubmit,
      testSubmit,
    } = testForm(INPUTS);

    const checkbox3 = await screen.findByLabelText('Option 3');
    expect(checkbox3).toBeChecked();

    await testSubmit(async (data) =>
      expect(data).toMatchObject({
        checkboxGroup: [
          {
            label: 'Option 3',
            value: '3',
          },
        ],
      }),
    );
  });

  test('If required, form submits only if any checkbox is checked', async () => {
    const INPUTS: InputsPropsType = {
      checkboxGroup: {
        type: InputType.CheckboxGroup,
        label: 'Test Label',
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
    };

    const {
      formData: { container },
      expectNoSubmit,
      testSubmit,
    } = testForm(INPUTS);

    await expectNoSubmit();

    const checkbox3 = await screen.findByLabelText('Option 3');
    await userEvent.click(checkbox3);

    await testSubmit(async (data) =>
      expect(data).toMatchObject({
        checkboxGroup: [
          {
            label: 'Option 3',
            value: '3',
          },
        ],
      }),
    );

    await userEvent.click(checkbox3);
    await expectNoSubmit();
  });
});
