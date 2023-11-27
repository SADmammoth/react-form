import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IFormProps } from '../types/IFormProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import TestForm from './helpers/TestForm';
import { testForm } from './helpers/formTests';

type InputsPropsType = IFormProps<InputsProps>['inputs'];

describe('Radio Group input', () => {
  test('Labels display correctly', async () => {
    const INPUTS: InputsPropsType = {
      radioGroup: {
        type: InputType.RadioGroup,
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
      radioGroup: {
        type: InputType.RadioGroup,
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
        radioGroup: undefined,
      });
    });
    const radio1 = await screen.findByLabelText('Option 1');
    await userEvent.click(radio1);
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        radioGroup: { label: 'Option 1', value: '1' },
      });
    });
    await userEvent.click(radio1);
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        radioGroup: undefined,
      });
    });
    const radio2 = await screen.findByLabelText('Option 2');
    await userEvent.click(radio2);
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        radioGroup: { label: 'Option 2', value: '2' },
      });
    });
    const radio3 = await screen.findByLabelText('Option 3');
    await userEvent.click(radio3);
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        radioGroup: { label: 'Option 3', value: '3' },
      });
    });
  });

  test('Correctly displays the value', async () => {
    const INPUTS: InputsPropsType = {
      radioGroup: {
        type: InputType.RadioGroup,
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
        radioGroup: undefined,
      });
    });
    const radio1 = await screen.findByLabelText('Option 1');
    const radio2 = await screen.findByLabelText('Option 2');
    const radio3 = await screen.findByLabelText('Option 3');

    await userEvent.click(radio1);
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();

    await userEvent.click(radio1);
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();

    await userEvent.click(radio2);
    expect(radio1).not.toBeChecked();
    expect(radio2).toBeChecked();
    expect(radio3).not.toBeChecked();

    await userEvent.click(radio3);
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeChecked();
  });

  test('Default value sets correctly', async () => {
    const INPUTS: InputsPropsType = {
      radioGroup: {
        type: InputType.RadioGroup,
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
        value: {
          label: 'Option 3',
          value: '3',
        },
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const radio1 = await screen.findByLabelText('Option 1');
    const radio2 = await screen.findByLabelText('Option 2');
    const radio3 = await screen.findByLabelText('Option 3');

    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeChecked();
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        radioGroup: {
          label: 'Option 3',
          value: '3',
        },
      });
    });
  });

  test('Default value updates correctly', async () => {
    const INPUTS: InputsPropsType = {
      radioGroup: {
        type: InputType.RadioGroup,
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
        value: {
          label: 'Option 3',
          value: '3',
        },
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const radio1 = await screen.findByLabelText('Option 1');
    const radio2 = await screen.findByLabelText('Option 2');
    const radio3 = await screen.findByLabelText('Option 3');

    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeChecked();
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        radioGroup: {
          label: 'Option 3',
          value: '3',
        },
      });
    });

    await userEvent.click(radio3);
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        radioGroup: undefined,
      });
    });

    await userEvent.click(radio1);
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        radioGroup: {
          label: 'Option 1',
          value: '1',
        },
      });
    });

    await userEvent.click(radio2);
    expect(radio1).not.toBeChecked();
    expect(radio2).toBeChecked();
    expect(radio3).not.toBeChecked();
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        radioGroup: {
          label: 'Option 2',
          value: '2',
        },
      });
    });
  });

  test('If required, form submits if default value set', async () => {
    const INPUTS: InputsPropsType = {
      radioGroup: {
        type: InputType.RadioGroup,
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
        value: {
          label: 'Option 3',
          value: '3',
        },
      },
    };

    const {
      formData: { container },
      expectNoSubmit,
      testSubmit,
    } = testForm(INPUTS);

    const radio3 = await screen.findByLabelText('Option 3');
    expect(radio3).toBeChecked();

    await testSubmit(async (data) =>
      expect(data).toMatchObject({
        radioGroup: {
          label: 'Option 3',
          value: '3',
        },
      }),
    );
  });

  test('If required, form submits only if any radio is checked', async () => {
    const INPUTS: InputsPropsType = {
      radioGroup: {
        type: InputType.RadioGroup,
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

    const radio3 = await screen.findByLabelText('Option 3');
    await userEvent.click(radio3);

    await testSubmit(async (data) =>
      expect(data).toMatchObject({
        radioGroup: {
          label: 'Option 3',
          value: '3',
        },
      }),
    );
  });

  test('Radio button can be unchecked if group is not required', async () => {
    const INPUTS: InputsPropsType = {
      radioGroup: {
        type: InputType.RadioGroup,
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
        value: {
          label: 'Option 2',
          value: '2',
        },
      },
    };

    const {
      formData: { container },
      expectNoSubmit,
      testSubmit,
    } = testForm(INPUTS);

    const radio2 = await screen.findByLabelText('Option 2');
    await userEvent.click(radio2);
    expect(radio2).not.toBeChecked();

    await testSubmit(async (data) =>
      expect(data).toMatchObject({
        radioGroup: undefined,
      }),
    );
  });

  test('Radio button cannot be unchecked if group is required', async () => {
    const INPUTS: InputsPropsType = {
      radioGroup: {
        type: InputType.RadioGroup,
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
        value: {
          label: 'Option 2',
          value: '2',
        },
      },
    };

    const {
      formData: { container },
      expectNoSubmit,
      testSubmit,
    } = testForm(INPUTS);

    const radio2 = await screen.findByLabelText('Option 2');
    await userEvent.click(radio2);
    expect(radio2).toBeChecked();

    await testSubmit(async (data) =>
      expect(data).toMatchObject({
        radioGroup: {
          label: 'Option 2',
          value: '2',
        },
      }),
    );
  });
});
