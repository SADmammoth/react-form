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

  describe('Validation', () => {
    test('Unable to enter letters, but able to enter numbers', async () => {
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
      await userEvent.type(input, 'L1e1t1te1rs');
      await userEvent.click(container);

      expect(input).toHaveValue('1111');

      await testSubmit(async (data) =>
        expect(data).toMatchObject({ number: 1111 }),
      );
    });

    test('Unable to submit form with letters at default value', async () => {
      const INPUTS: InputsPropsType = {
        //@ts-ignore
        number: {
          type: InputType.Number,
          label: 'Test Label',
          value: 'L1e1t1te1rs',
        },
      };

      const {
        formData: { container },
        testValidationFail,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');

      await testValidationFail();
    });

    test('Able to enter the correct number', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 0,
          max: 6,
        },
      };

      const {
        formData: { container },
        testSubmit,
        testValidationFail,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      await userEvent.click(input);
      await userEvent.type(input, '2');
      await userEvent.click(container);

      expect(input).toHaveValue('2');

      await testSubmit(async (data) =>
        expect(data).toMatchObject({ number: 2 }),
      );
    });

    test('Able to enter the negative and decimal numbers', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: -2,
          max: 6,
        },
      };

      const {
        formData: { container },
        testSubmit,
        testValidationFail,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      await userEvent.click(input);
      await userEvent.type(input, '-1.3');
      await userEvent.click(container);

      expect(input).toHaveValue('-1.3');

      await testSubmit(async (data) =>
        expect(data).toMatchObject({ number: -1.3 }),
      );
    });

    test('Able to enter, unable to submit the number out of range (max)', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 0,
          max: 6,
        },
      };

      const {
        formData: { container },
        testSubmit,
        testValidationFail,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      await userEvent.click(input);
      await userEvent.type(input, '8');
      await userEvent.click(container);

      expect(input).toHaveValue('8');

      await testValidationFail();
    });

    test('Able to enter, unable to submit the number out of range (min)', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 2,
          max: 6,
        },
      };

      const {
        formData: { container },
        testSubmit,
        testValidationFail,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      await userEvent.click(input);
      await userEvent.type(input, '1');
      await userEvent.click(container);

      expect(input).toHaveValue('1');

      await testValidationFail();
    });

    test('Able to enter, unable to submit the number with wrong step', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 0,
          max: 6,
        },
      };

      const {
        formData: { container },
        testSubmit,
        testValidationFail,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      await userEvent.click(input);
      await userEvent.type(input, '3');
      await userEvent.click(container);

      expect(input).toHaveValue('3');

      await testValidationFail();
    });

    test('Unable to submit with the wrong default number', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 0,
          max: 6,
          step: 2,
          value: 3.5,
        },
      };

      const {
        formData: { container },
        testSubmit,
        testValidationFail,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      expect(input).toHaveValue('3.5');

      await testValidationFail();
    });
  });

  describe('Buttons', () => {
    test('Button "plus" increments value by step', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 0,
          max: 6,
          step: 2,
        },
      };

      const {
        formData: { container },
        testSubmit,
        testValidationFail,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      await userEvent.click(input);
      await userEvent.type(input, '2');
      await userEvent.click(container);

      const button = await screen.findByTitle('Plus');
      await userEvent.click(button);
      expect(input).toHaveValue('4');
      await userEvent.click(button);
      expect(input).toHaveValue('6');

      await testSubmit(async (data) =>
        expect(data).toMatchObject({ number: 6 }),
      );
    });

    test('Button "minus" increments value by step', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 0,
          max: 6,
          step: 2,
        },
      };

      const {
        formData: { container },
        testSubmit,
        testValidationFail,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      await userEvent.click(input);
      await userEvent.type(input, '4');
      await userEvent.click(container);

      const button = await screen.findByTitle('Minus');
      await userEvent.click(button);
      expect(input).toHaveValue('2');
      await userEvent.click(button);
      expect(input).toHaveValue('0');

      await testSubmit(async (data) =>
        expect(data).toMatchObject({ number: 0 }),
      );
    });

    test('Button "plus" is disabled when out of max bounds', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 0,
          max: 6,
          step: 2,
        },
      };

      const {
        formData: { container },
        testSubmit,
        testValidationFail,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      await userEvent.click(input);
      await userEvent.type(input, '7');
      await userEvent.click(container);

      const button = await screen.findByTitle('Plus');
      expect(button).toBeDisabled();
      await userEvent.click(button);
      expect(input).toHaveValue('7');

      await testValidationFail();
    });

    test('Button "plus" should be disabled after incrementing to the max bounds', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 0,
          max: 3,
        },
      };

      const {
        formData: { container },
        testSubmit,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      const button = await screen.findByTitle('Plus');

      await userEvent.click(button); // 1
      await userEvent.click(button); // 2
      await userEvent.click(button); // 3

      expect(button).toBeDisabled();
      await userEvent.click(button);
      expect(input).toHaveValue('3');

      await testSubmit(async (data) =>
        expect(data).toMatchObject({ number: 3 }),
      );
    });

    test('Button "minus" is disabled when out of min bounds', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 3,
          max: 6,
        },
      };

      const {
        formData: { container },
        testSubmit,
        testValidationFail,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      await userEvent.click(input);
      await userEvent.type(input, '2');
      await userEvent.click(container);

      const button = await screen.findByTitle('Minus');
      expect(button).toBeDisabled();
      await userEvent.click(button);
      expect(input).toHaveValue('2');

      await testValidationFail();
    });

    test('Button "minus" should be disabled after decrementing to the min bounds', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: -3,
          max: 0,
        },
      };

      const {
        formData: { container },
        testSubmit,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      const button = await screen.findByTitle('Minus');

      await userEvent.click(button); // -1
      await userEvent.click(button); // -2
      await userEvent.click(button); // -3

      expect(button).toBeDisabled();
      await userEvent.click(button);
      expect(input).toHaveValue('-3');

      await testSubmit(async (data) =>
        expect(data).toMatchObject({ number: -3 }),
      );
    });

    test('If value is not valid number but in range, "minus" button sets to closest valid number, less than current value', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 0,
          max: 6,
          step: 2,
        },
      };

      const {
        formData: { container },
        testSubmit,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      await userEvent.click(input);
      await userEvent.type(input, '3');
      await userEvent.click(container);
      const button = await screen.findByTitle('Minus');
      expect(input).toHaveValue('3');
      await userEvent.click(button);
      expect(input).toHaveValue('2');

      await testSubmit(async (data) =>
        expect(data).toMatchObject({ number: 2 }),
      );
    });

    test('If value is not valid number but in range, "plus" button sets to closest valid number, greater than current value', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 0,
          max: 6,
          step: 2,
        },
      };

      const {
        formData: { container },
        testSubmit,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      await userEvent.click(input);
      await userEvent.type(input, '3');
      await userEvent.click(container);
      const button = await screen.findByTitle('Plus');
      expect(input).toHaveValue('3');
      await userEvent.click(button);
      expect(input).toHaveValue('4');

      await testSubmit(async (data) =>
        expect(data).toMatchObject({ number: 4 }),
      );
    });

    test('Button "minus" sets min value if no default value', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 0,
          max: 6,
        },
      };

      const {
        formData: { container },
        testSubmit,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      const button = await screen.findByTitle('Minus');

      await userEvent.click(button);
      expect(button).toBeDisabled();
      await userEvent.click(button);

      expect(input).toHaveValue('0');

      await testSubmit(async (data) =>
        expect(data).toMatchObject({ number: 0 }),
      );
    });

    test('Button "plus" sets min value + 1 if no default value', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 0,
          max: 6,
        },
      };

      const {
        formData: { container },
        testSubmit,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      const button = await screen.findByTitle('Plus');
      await userEvent.click(button);
      expect(input).toHaveValue('1');
      await userEvent.click(button);
      expect(input).toHaveValue('2');
      await userEvent.click(button);
      expect(input).toHaveValue('3');

      await testSubmit(async (data) =>
        expect(data).toMatchObject({ number: 3 }),
      );
    });

    test('If default value out of max bounds, "plus" button is disabled', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 3,
          max: 6,
          value: 10,
        },
      };

      const {
        formData: { container },
        testSubmit,
        testValidationFail,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      const button = await screen.findByTitle('Plus');
      expect(button).toBeDisabled();
      await userEvent.click(button);
      expect(input).toHaveValue('10');

      await testValidationFail();
    });

    test('If default value out of min bounds, "minus" button is disabled', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 3,
          max: 6,
          value: 2,
        },
      };

      const {
        formData: { container },
        testSubmit,
        testValidationFail,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      const button = await screen.findByTitle('Minus');
      expect(button).toBeDisabled();
      await userEvent.click(button);
      expect(input).toHaveValue('2');

      await testValidationFail();
    });

    test('If default value is not valid number but in range, "minus" button sets to closest valid number, less than current value', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 0,
          max: 6,
          step: 2,
          value: 3,
        },
      };

      const {
        formData: { container },
        testSubmit,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      const button = await screen.findByTitle('Minus');
      expect(input).toHaveValue('3');
      await userEvent.click(button);
      expect(input).toHaveValue('2');

      await testSubmit(async (data) =>
        expect(data).toMatchObject({ number: 2 }),
      );
    });

    test('If default value is not valid number but in range, "plus" button sets to closest valid number, greater than current value', async () => {
      const INPUTS: InputsPropsType = {
        number: {
          type: InputType.Number,
          label: 'Test Label',
          min: 0,
          max: 6,
          step: 2,
          value: 3,
        },
      };

      const {
        formData: { container },
        testSubmit,
      } = testForm(INPUTS);

      const input = await screen.findByLabelText('Test Label');
      const button = await screen.findByTitle('Plus');
      expect(input).toHaveValue('3');
      await userEvent.click(button);
      expect(input).toHaveValue('4');

      await testSubmit(async (data) =>
        expect(data).toMatchObject({ number: 4 }),
      );
    });
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
