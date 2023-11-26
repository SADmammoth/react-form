import '@testing-library/jest-dom';
import { queryByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IFormProps } from '../types/IFormProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { ValueDisplayStyle } from '../types/InputsProps/atomic/ValueDisplayStyle';
import TestForm from './helpers/TestForm';
import drag from './helpers/drag';
import { testForm } from './helpers/formTests';
import { getLetterByAlphabetIndex } from './helpers/getLetterByAlphabetIndex';
import {
  clickTheValue,
  getSliderCoordinatesFromIndex,
  slideTheValue,
} from './helpers/sliderHelpers';

type InputsPropsType = IFormProps<InputsProps>['inputs'];

function valueOptionsRange(
  from: number,
  to: number,
  labelTemplate = (value: string) => value,
  valueTemplate = (value: string) => value,
) {
  return Array(to - from + 1)
    .fill(0)
    .map((_, i) => ({
      label: labelTemplate((from + i).toString()),
      value: valueTemplate((from + i).toString()),
    }));
}

describe('Range input', () => {
  test('Placeholder and label display correctly', async () => {
    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: { from: 0, to: 100 },
      },
    };

    testForm(INPUTS);

    expect(await screen.findByLabelText('Test Label')).not.toBeNull();
  });

  test('Correctly saves the value', async () => {
    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: { from: 0, to: 10 },
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const [leftSliderThumb, rightSliderThumb] = await screen.findAllByTestId(
      'sliderThumb',
    );
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!leftSliderThumb || !rightSliderThumb || !sliderTrack) return;

    await slideTheValue(leftSliderThumb, sliderTrack, 0, 2, 9);
    await slideTheValue(rightSliderThumb, sliderTrack, 9, 3, 9);
    await userEvent.click(container);

    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        range: {
          from: {
            label: '2',
            value: '2',
          },
          range: valueOptionsRange(2, 3),
          to: {
            label: '3',
            value: '3',
          },
        },
      });
    });
    await slideTheValue(rightSliderThumb, sliderTrack, 3, 5, 9);
    await slideTheValue(leftSliderThumb, sliderTrack, 2, 4, 9);
    await userEvent.click(container);

    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        range: {
          from: {
            label: '4',
            value: '4',
          },
          range: valueOptionsRange(4, 5),
          to: {
            label: '5',
            value: '5',
          },
        },
      });
    });
  });

  test('Tooltip displays correctly (explicit valueOptions)', async () => {
    const VALUE_OPTIONS = new Array(100).fill(0).map((_, i) => {
      return {
        label: `Label ${i + 1}`,
        value: `Value ${i + 1}`,
      };
    });

    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: VALUE_OPTIONS,
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const [leftSliderThumb, rightSliderThumb] = await screen.findAllByTestId(
      'sliderThumb',
    );
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!leftSliderThumb || !rightSliderThumb || !sliderTrack) return;

    await slideTheValue(leftSliderThumb, sliderTrack, 0, 22, 100);
    await slideTheValue(rightSliderThumb, sliderTrack, 100, 33, 100);
    await userEvent.click(container);

    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        range: {
          from: {
            label: 'Label 22',
            value: 'Value 22',
          },
          range: valueOptionsRange(
            22,
            33,
            (l) => `Label ${l}`,
            (v) => `Value ${v}`,
          ),
          to: {
            label: 'Label 33',
            value: 'Value 33',
          },
        },
      });
    });
    await slideTheValue(rightSliderThumb, sliderTrack, 33, 55, 100);
    await slideTheValue(leftSliderThumb, sliderTrack, 22, 44, 100);
    await userEvent.click(container);

    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        range: {
          from: {
            label: 'Label 44',
            value: 'Value 44',
          },
          range: valueOptionsRange(
            44,
            55,
            (l) => `Label ${l}`,
            (v) => `Value ${v}`,
          ),
          to: {
            label: 'Label 55',
            value: 'Value 55',
          },
        },
      });
    });
  });

  test('Tooltip displays correctly (from-to, left thumb)', async () => {
    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: { from: 0, to: 100 },
      },
    };

    testForm(INPUTS);

    const [leftSliderThumb, rightSliderThumb] = await screen.findAllByTestId(
      'sliderThumb',
    );
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!leftSliderThumb || !rightSliderThumb || !sliderTrack) return;

    await slideTheValue(
      leftSliderThumb,
      sliderTrack,
      0,
      98,
      99,
      (index: number) => {
        screen.findByRole('tooltip').then((tooltip) => {
          expect(tooltip).toHaveTextContent(index.toString());
        });
      },
    );
  });

  test('Tooltip displays correctly (right thumb)', async () => {
    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: { from: 0, to: 100 },
      },
    };

    testForm(INPUTS);

    const [leftSliderThumb, rightSliderThumb] = await screen.findAllByTestId(
      'sliderThumb',
    );
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!leftSliderThumb || !rightSliderThumb || !sliderTrack) return;
    await slideTheValue(
      rightSliderThumb,
      sliderTrack,
      99,
      1,
      99,
      undefined,
      true,
    );
    await slideTheValue(
      rightSliderThumb,
      sliderTrack,
      1,
      99,
      99,
      (index: number) => {
        screen.findByRole('tooltip').then((tooltip) => {
          expect(tooltip).toHaveTextContent(index.toString());
        });
      },
    );
  });

  test('Tooltip displays correctly (from-to, labelCalculator)', async () => {
    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: {
          from: 0,
          to: 26,
          labelCalculator: getLetterByAlphabetIndex,
        },
      },
    };

    testForm(INPUTS);

    const [leftSliderThumb, rightSliderThumb] = await screen.findAllByTestId(
      'sliderThumb',
    );
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!leftSliderThumb || !rightSliderThumb || !sliderTrack) return;

    await slideTheValue(
      leftSliderThumb,
      sliderTrack,
      0,
      25,
      25,
      (index: number) => {
        screen.findByRole('tooltip').then((tooltip) => {
          expect(tooltip).toHaveTextContent(getLetterByAlphabetIndex(index));
        });
      },
    );
  });

  test('Tooltip displays correctly (valueOptions)', async () => {
    const VALUE_OPTIONS = new Array(10).fill(0).map((_, i) => {
      return {
        label: `Label ${i + 1}`,
        value: `Value ${i + 1}`,
      };
    });
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: VALUE_OPTIONS,
      },
    };

    testForm(INPUTS);

    const [leftSliderThumb, rightSliderThumb] = await screen.findAllByTestId(
      'sliderThumb',
    );
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!leftSliderThumb || !rightSliderThumb || !sliderTrack) return;

    await slideTheValue(
      leftSliderThumb,
      sliderTrack,
      0,
      5,
      9,
      (index: number) => {
        screen.findByRole('tooltip').then((tooltip) => {
          expect(tooltip).toHaveTextContent(`Label ${index + 1}`);
        });
      },
    );
  });

  test('Tooltip is hidden, when display style is HIDE_ALL', async () => {
    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: { from: 0, to: 10 },
        valueDisplayStyle: ValueDisplayStyle.HideAll,
      },
    };

    const {
      formData: { container },
    } = testForm(INPUTS);

    const [leftSliderThumb, rightSliderThumb] = await screen.findAllByTestId(
      'sliderThumb',
    );
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!leftSliderThumb || !rightSliderThumb || !sliderTrack) return;

    await slideTheValue(
      leftSliderThumb,
      sliderTrack,
      0,
      9,
      9,
      (index: number) => {
        expect(queryByRole(container, 'tooltip')).not.toBeInTheDocument();
      },
    );
  });

  test('Tooltip is hidden, when display style is SHOW_VALUE', async () => {
    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: { from: 0, to: 10 },
        valueDisplayStyle: ValueDisplayStyle.ShowValue,
      },
    };

    const {
      formData: { container },
    } = testForm(INPUTS);

    const [leftSliderThumb, rightSliderThumb] = await screen.findAllByTestId(
      'sliderThumb',
    );
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!leftSliderThumb || !rightSliderThumb || !sliderTrack) return;

    await slideTheValue(
      leftSliderThumb,
      sliderTrack,
      0,
      9,
      9,
      (index: number) => {
        expect(queryByRole(container, 'tooltip')).not.toBeInTheDocument();
      },
    );
  });

  test('Tooltip is always shown, when display style is ALWAYS_SHOW_TIP', async () => {
    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: { from: 0, to: 10 },
        valueDisplayStyle: ValueDisplayStyle.AlwaysShowTip,
      },
    };

    testForm(INPUTS);

    const [leftSliderThumb, rightSliderThumb] = await screen.findAllByTestId(
      'sliderThumb',
    );
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!leftSliderThumb || !rightSliderThumb || !sliderTrack) return;

    let tooltips = screen.getAllByRole('tooltip');
    expect(tooltips).not.toBeNull();
    expect(tooltips).toHaveLength(2);

    await slideTheValue(
      leftSliderThumb,
      sliderTrack,
      0,
      9,
      9,
      (index: number) => {
        tooltips = screen.getAllByRole('tooltip');
        expect(tooltips).not.toBeNull();
        expect(tooltips).toHaveLength(2);
      },
    );

    tooltips = screen.getAllByRole('tooltip');
    expect(tooltips).not.toBeNull();
    expect(tooltips).toHaveLength(2);
  });

  test('Tooltip is shown on hover, when display style is SHOW_MIN_MAX', async () => {
    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: { from: 0, to: 10 },
        valueDisplayStyle: ValueDisplayStyle.ShowMinMax,
      },
    };

    const {
      formData: { container },
    } = testForm(INPUTS);

    const [leftSliderThumb, rightSliderThumb] = await screen.findAllByTestId(
      'sliderThumb',
    );
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!leftSliderThumb || !rightSliderThumb || !sliderTrack) return;
    expect(queryByRole(container, 'tooltip')).not.toBeInTheDocument();

    await slideTheValue(
      leftSliderThumb,
      sliderTrack,
      0,
      9,
      9,
      (index: number) => {
        expect(queryByRole(container, 'tooltip')).toBeInTheDocument();
      },
    );

    expect(queryByRole(container, 'tooltip')).not.toBeInTheDocument();

    await userEvent.hover(leftSliderThumb);
    expect(queryByRole(container, 'tooltip')).toBeInTheDocument();
  });

  test('Tooltip is shown on hover by default', async () => {
    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: { from: 0, to: 10 },
      },
    };

    const {
      formData: { container },
    } = testForm(INPUTS);

    const [leftSliderThumb, rightSliderThumb] = await screen.findAllByTestId(
      'sliderThumb',
    );
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!leftSliderThumb || !rightSliderThumb || !sliderTrack) return;

    expect(queryByRole(container, 'tooltip')).not.toBeInTheDocument();

    await slideTheValue(
      leftSliderThumb,
      sliderTrack,
      0,
      9,
      9,
      (index: number) => {
        expect(queryByRole(container, 'tooltip')).toBeInTheDocument();
      },
    );

    expect(queryByRole(container, 'tooltip')).not.toBeInTheDocument();

    await userEvent.hover(leftSliderThumb);
    expect(queryByRole(container, 'tooltip')).toBeInTheDocument();
  });

  test('Value is displayed correctly on drag (SHOW_VALUE)', async () => {
    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: { from: 0, to: 10 },
        valueDisplayStyle: ValueDisplayStyle.ShowValue,
      },
    };

    const {
      formData: { container },
    } = testForm(INPUTS);
    const [leftSliderThumb, rightSliderThumb] = await screen.findAllByTestId(
      'sliderThumb',
    );
    const sliderTrack = await screen.findByTestId('sliderTrack');
    const input = await screen.findByLabelText('Test Label');
    if (!leftSliderThumb || !rightSliderThumb || !sliderTrack) return;

    await slideTheValue(
      leftSliderThumb,
      sliderTrack,
      0,
      9,
      9,
      (index: number) => {
        const { value } = input as HTMLInputElement;
        expect(value).toBe(index.toString());
      },
    );
  });

  test('Value is displayed correctly on drag (SHOW_VALUE, labelCalculator)', async () => {
    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: {
          from: 0,
          to: 26,
          labelCalculator: getLetterByAlphabetIndex,
        },
        valueDisplayStyle: ValueDisplayStyle.ShowValue,
      },
    };

    const {
      formData: { container },
    } = testForm(INPUTS);

    const [leftSliderThumb, rightSliderThumb] = await screen.findAllByTestId(
      'sliderThumb',
    );
    const sliderTrack = await screen.findByTestId('sliderTrack');
    const input = await screen.findByLabelText('Test Label');
    if (!leftSliderThumb || !rightSliderThumb || !sliderTrack) return;

    await slideTheValue(
      leftSliderThumb,
      sliderTrack,
      0,
      25,
      25,
      (index: number) => {
        const { value } = input as HTMLInputElement;
        expect(value).toBe(getLetterByAlphabetIndex(index));
      },
    );
  });

  test('Min and max is displayed correctly', async () => {
    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueOptions: {
          from: 0,
          to: 26,
          labelCalculator: getLetterByAlphabetIndex,
        },
        valueDisplayStyle: ValueDisplayStyle.ShowMinMax,
      },
    };

    const {
      formData: { container },
    } = testForm(INPUTS);

    const min = await screen.findByTestId('sliderMin');
    const max = await screen.findByTestId('sliderMax');
    if (!min || !max) return;

    expect(min).toHaveTextContent('a');
    expect(max).toHaveTextContent('z');
  });

  test('Default value is set correctly', async () => {
    const INPUTS: InputsPropsType = {
      range: {
        type: InputType.Range,
        label: 'Test Label',
        valueDisplayStyle: ValueDisplayStyle.ShowValue,
        valueOptions: {
          from: 0,
          to: 26,
          labelCalculator: getLetterByAlphabetIndex,
        },
        value: {
          from: {
            label: getLetterByAlphabetIndex(5),
            value: '5',
          },
          to: {
            label: getLetterByAlphabetIndex(20),
            value: '20',
          },
          range: valueOptionsRange(5, 20, (l) =>
            getLetterByAlphabetIndex(parseInt(l)),
          ),
        },
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const [leftSliderThumb, rightSliderThumb] = await screen.findAllByTestId(
      'sliderThumb',
    );
    const sliderTrack = await screen.findByTestId('sliderTrack');
    const input = await screen.findByLabelText('Test Label');
    if (!leftSliderThumb || !rightSliderThumb || !sliderTrack) return;

    expect(input).toHaveValue(getLetterByAlphabetIndex(5));

    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        range: {
          from: {
            label: getLetterByAlphabetIndex(5),
            value: '5',
          },
          to: {
            label: getLetterByAlphabetIndex(20),
            value: '20',
          },
          range: valueOptionsRange(5, 20, (l) =>
            getLetterByAlphabetIndex(parseInt(l)),
          ),
        },
      });
    });
  });

  // TODO: Think how required slider would behave
  // TODO: Add checks for right thumb
});
