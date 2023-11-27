import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IFormProps } from '../../types/IFormProps';
import { InputsProps } from '../../types/InputsProps/InputsProps';
import { OnSubmitFunction } from '../../types/OnSubmitCallback';
import TestForm from './TestForm';

export const testForm = (inputs: IFormProps<InputsProps>['inputs']) => {
  const onSubmitMock = jest.fn();
  let _onSubmitCallback: OnSubmitFunction | null = null;
  return {
    formData: render(
      <TestForm
        formId="form"
        inputs={inputs}
        onSubmit={async (data) => {
          onSubmitMock();
          _onSubmitCallback?.(data);
        }}
      />,
    ),
    testSubmit: async (onSubmit: OnSubmitFunction) => {
      _onSubmitCallback = onSubmit;
      await userEvent.click(await screen.findByText('Submit'));

      expect(onSubmitMock).toHaveBeenCalledTimes(1);
      onSubmitMock.mockClear();
    },
    expectNoSubmit: async () => {
      await userEvent.click(await screen.findByText('Submit'));

      expect(onSubmitMock).not.toHaveBeenCalled();
      onSubmitMock.mockClear();
    },
    testValidationFail: async () => {
      await userEvent.click(await screen.findByText('Submit'));

      expect(onSubmitMock).not.toHaveBeenCalled();
      onSubmitMock.mockClear();
    },
  };
};
