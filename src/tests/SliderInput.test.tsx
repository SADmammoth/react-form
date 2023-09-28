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
import { clickTheValue, slideTheValue } from './helpers/sliderHelpers';

type InputsPropsType = IFormProps<InputsProps>['inputs'];

describe('Slider input', () => {
  test('Placeholder and label display correctly', async () => {
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: { from: 0, to: 100 },
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
        valueOptions: { from: 0, to: 100 },
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

  test('Tooltip displays correctly (explicit valueOptions)', async () => {
    const VALUE_OPTIONS = new Array(100).fill(0).map((_, i) => {
      return {
        label: `Label ${i + 1}`,
        value: `Value ${i + 1}`,
      };
    });
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: VALUE_OPTIONS,
      },
    };

    const {
      formData: { container },
      testSubmit,
    } = testForm(INPUTS);

    const sliderThumb = await screen.findByTestId('sliderThumb');
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!sliderThumb || !sliderTrack) return;

    await slideTheValue(sliderThumb, sliderTrack, 0, 5, 99);

    await testSubmit(async (data) => {
      expect(data).toMatchObject({
        slider: {
          label: 'Label 6',
          value: 'Value 6',
        },
      });
    });
  });

  test('Correctly saves the value (click)', async () => {
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: { from: 0, to: 100 },
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

  test('Tooltip displays correctly (from-to)', async () => {
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: { from: 0, to: 100 },
      },
    };

    testForm(INPUTS);

    const sliderThumb = await screen.findByTestId('sliderThumb');
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!sliderThumb || !sliderTrack) return;

    await slideTheValue(
      sliderThumb,
      sliderTrack,
      0,
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
      slider: {
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: {
          from: 0,
          to: 26,
          labelCalculator: getLetterByAlphabetIndex,
        },
      },
    };

    testForm(INPUTS);

    const sliderThumb = await screen.findByTestId('sliderThumb');
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!sliderThumb || !sliderTrack) return;

    await slideTheValue(
      sliderThumb,
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
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: VALUE_OPTIONS,
      },
    };

    testForm(INPUTS);

    const sliderThumb = await screen.findByTestId('sliderThumb');
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!sliderThumb || !sliderTrack) return;

    await slideTheValue(sliderThumb, sliderTrack, 0, 5, 9, (index: number) => {
      screen.findByRole('tooltip').then((tooltip) => {
        expect(tooltip).toHaveTextContent(`Label ${index + 1}`);
      });
    });
  });

  test('Tooltip is hidden, when display style is HIDE_ALL', async () => {
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: { from: 0, to: 10 },
        valueDisplayStyle: ValueDisplayStyle.HideAll,
      },
    };

    const {
      formData: { container },
    } = testForm(INPUTS);

    const sliderThumb = await screen.findByTestId('sliderThumb');
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!sliderThumb || !sliderTrack) return;

    await slideTheValue(sliderThumb, sliderTrack, 0, 9, 9, (index: number) => {
      expect(queryByRole(container, 'tooltip')).not.toBeInTheDocument();
    });
  });

  test('Tooltip is hidden, when display style is SHOW_VALUE', async () => {
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: { from: 0, to: 10 },
        valueDisplayStyle: ValueDisplayStyle.ShowValue,
      },
    };

    const {
      formData: { container },
    } = testForm(INPUTS);

    const sliderThumb = await screen.findByTestId('sliderThumb');
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!sliderThumb || !sliderTrack) return;

    await slideTheValue(sliderThumb, sliderTrack, 0, 9, 9, (index: number) => {
      expect(queryByRole(container, 'tooltip')).not.toBeInTheDocument();
    });
  });

  test('Tooltip is always shown, when display style is ALWAYS_SHOW_TIP', async () => {
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: { from: 0, to: 10 },
        valueDisplayStyle: ValueDisplayStyle.AlwaysShowTip,
      },
    };

    testForm(INPUTS);

    const sliderThumb = await screen.findByTestId('sliderThumb');
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!sliderThumb || !sliderTrack) return;

    let tooltip = screen.getByRole('tooltip');
    expect(tooltip).not.toBeNull();

    await slideTheValue(sliderThumb, sliderTrack, 0, 9, 9, (index: number) => {
      tooltip = screen.getByRole('tooltip');
      expect(tooltip).not.toBeNull();
    });

    tooltip = screen.getByRole('tooltip');
    expect(tooltip).not.toBeNull();
  });

  test('Tooltip is shown on hover, when display style is SHOW_MIN_MAX', async () => {
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: { from: 0, to: 10 },
        valueDisplayStyle: ValueDisplayStyle.ShowMinMax,
      },
    };

    const {
      formData: { container },
    } = testForm(INPUTS);

    const sliderThumb = await screen.findByTestId('sliderThumb');
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!sliderThumb || !sliderTrack) return;

    expect(queryByRole(container, 'tooltip')).not.toBeInTheDocument();

    await slideTheValue(sliderThumb, sliderTrack, 0, 9, 9, (index: number) => {
      expect(queryByRole(container, 'tooltip')).toBeInTheDocument();
    });

    expect(queryByRole(container, 'tooltip')).not.toBeInTheDocument();

    await userEvent.hover(sliderThumb);
    expect(queryByRole(container, 'tooltip')).toBeInTheDocument();
  });

  test('Tooltip is shown on hover by default', async () => {
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: { from: 0, to: 10 },
      },
    };

    const {
      formData: { container },
    } = testForm(INPUTS);

    const sliderThumb = await screen.findByTestId('sliderThumb');
    const sliderTrack = await screen.findByTestId('sliderTrack');
    if (!sliderThumb || !sliderTrack) return;

    expect(queryByRole(container, 'tooltip')).not.toBeInTheDocument();

    await slideTheValue(sliderThumb, sliderTrack, 0, 9, 9, (index: number) => {
      expect(queryByRole(container, 'tooltip')).toBeInTheDocument();
    });

    expect(queryByRole(container, 'tooltip')).not.toBeInTheDocument();

    await userEvent.hover(sliderThumb);
    expect(queryByRole(container, 'tooltip')).toBeInTheDocument();
  });

  test('Value is displayed correctly on drag (SHOW_VALUE)', async () => {
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Slider,
        label: 'Test Label',
        valueOptions: { from: 0, to: 10 },
        valueDisplayStyle: ValueDisplayStyle.ShowValue,
      },
    };

    const {
      formData: { container },
    } = testForm(INPUTS);

    const sliderThumb = await screen.findByTestId('sliderThumb');
    const sliderTrack = await screen.findByTestId('sliderTrack');
    const input = await screen.findByLabelText('Test Label');
    if (!sliderThumb || !sliderTrack || !input) return;

    await slideTheValue(sliderThumb, sliderTrack, 0, 9, 9, (index: number) => {
      const { value } = input as HTMLInputElement;
      expect(value).toBe(index.toString());
    });
  });

  test('Value is displayed correctly on drag (SHOW_VALUE, labelCalculator)', async () => {
    const INPUTS: InputsPropsType = {
      slider: {
        type: InputType.Slider,
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

    const sliderThumb = await screen.findByTestId('sliderThumb');
    const sliderTrack = await screen.findByTestId('sliderTrack');
    const input = await screen.findByLabelText('Test Label');
    if (!sliderThumb || !sliderTrack || !input) return;

    await slideTheValue(
      sliderThumb,
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
      slider: {
        type: InputType.Slider,
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
});
