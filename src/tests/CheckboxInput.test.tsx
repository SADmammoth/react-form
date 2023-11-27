import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IFormProps } from '../types/IFormProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import TestForm from './helpers/TestForm';
import { testForm } from './helpers/formTests';

type InputsPropsType = IFormProps<InputsProps>['inputs'];

describe('Checkbox input', () => {
  test('Label displays correctly', async () => {
    const INPUTS: InputsPropsType = {
      checkbox: {
        type: InputType.Checkbox,
        label: 'Test Label',
      },
    };

    testForm(INPUTS);

    expect(await screen.findByLabelText('Test Label')).not.toBeNull();
  });

  test('Correctly saves the value', async () => {
    const INPUTS: InputsPropsType = {
      checkbox: {
        type: InputType.Checkbox,
        label: 'Test Label',
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    await userEvent.click(input);
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkbox: true,
      });
    });
    await userEvent.click(input);
    await userEvent.click(input);
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkbox: true,
      });
    });
    await userEvent.click(input);
    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        checkbox: false,
      });
    });
  });

  test('Correctly displays the value', async () => {
    const INPUTS: InputsPropsType = {
      checkbox: {
        type: InputType.Checkbox,
        label: 'Test Label',
      },
    };

    const {
      formData: { container },
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    expect(input).not.toBeChecked();
    await userEvent.click(input);
    expect(input).toBeChecked();
    await userEvent.click(input);
    expect(input).not.toBeChecked();
    await userEvent.click(input);
    expect(input).toBeChecked();
  });

  test('Default value sets correctly (true)', async () => {
    const INPUTS: InputsPropsType = {
      checkbox: {
        type: InputType.Checkbox,
        label: 'Test Label',
        value: true,
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    expect(input).toBeChecked();

    await testSubmit(async (data) =>
      expect(data).toMatchObject({ checkbox: true }),
    );
  });

  test('Default value sets correctly (false)', async () => {
    const INPUTS: InputsPropsType = {
      checkbox: {
        type: InputType.Checkbox,
        label: 'Test Label',
        value: false,
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    expect(input).not.toBeChecked();

    await testSubmit(async (data) =>
      expect(data).toMatchObject({ checkbox: false }),
    );
  });

  test('Default value updates correctly (true)', async () => {
    const INPUTS: InputsPropsType = {
      checkbox: {
        type: InputType.Checkbox,
        label: 'Test Label',
        value: true,
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    expect(input).toBeChecked();
    await userEvent.click(input);
    expect(input).not.toBeChecked();
    await userEvent.click(input);
    expect(input).toBeChecked();

    await testSubmit(async (data) =>
      expect(data).toMatchObject({ checkbox: true }),
    );
  });

  test('Default value updates correctly (false)', async () => {
    const INPUTS: InputsPropsType = {
      checkbox: {
        type: InputType.Checkbox,
        label: 'Test Label',
        value: false,
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const input = await screen.findByLabelText('Test Label');
    expect(input).not.toBeChecked();
    await userEvent.click(input);
    expect(input).toBeChecked();
    await userEvent.click(input);
    expect(input).not.toBeChecked();

    await testSubmit(async (data) =>
      expect(data).toMatchObject({ checkbox: false }),
    );
  });

  test('If required, form submits if default value updated (default value is true)', async () => {
    const INPUTS: InputsPropsType = {
      checkbox: {
        type: InputType.Checkbox,
        label: 'Test Label',
        required: true,
        value: true,
      },
    };

    const {
      formData: { container },
      expectNoSubmit,
      testSubmit,
    } = testForm(INPUTS);

    await expectNoSubmit();

    const input = await screen.findByLabelText('Test Label');
    await userEvent.click(input);

    await testSubmit(async (data) =>
      expect(data).toMatchObject({ checkbox: false }),
    );
  });

  test('If required, form submits if default value updated (default value is false)', async () => {
    const INPUTS: InputsPropsType = {
      checkbox: {
        type: InputType.Checkbox,
        label: 'Test Label',
        required: true,
        value: false,
      },
    };

    const {
      formData: { container },
      expectNoSubmit,
      testSubmit,
    } = testForm(INPUTS);

    await expectNoSubmit();

    const input = await screen.findByLabelText('Test Label');
    await userEvent.click(input);

    await testSubmit(async (data) =>
      expect(data).toMatchObject({ checkbox: true }),
    );
  });

  test('If required, form submits if box checked (no default value)', async () => {
    const INPUTS: InputsPropsType = {
      checkbox: {
        type: InputType.Checkbox,
        label: 'Test Label',
        required: true,
      },
    };

    const {
      formData: { container },
      expectNoSubmit,
      testSubmit,
    } = testForm(INPUTS);

    await expectNoSubmit();

    const input = await screen.findByLabelText('Test Label');
    await userEvent.click(input);

    await testSubmit(async (data) =>
      expect(data).toMatchObject({ checkbox: true }),
    );
  });
});
