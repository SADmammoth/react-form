import React, { useCallback, useState } from 'react';
import Form from '../Form';

function MultiStepForm({
  steps,
  onSubmit,
  onSubmitStep = () => {},
  submitText,
  nextStepText,
  ...props
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const addData = (newData) =>
    setData((currentData) => ({ ...currentData, ...newData }));

  const stepForm = useCallback(
    async (formData) => {
      let newIndex;
      let endSteps;

      const proceed = (nextIndex) => {
        newIndex = nextIndex;
        endSteps = false;
      };
      const end = () => {
        endSteps = true;
      };

      await onSubmitStep(step, formData, proceed, end);

      if (!endSteps && step < steps.length - 1) {
        setStep((currentStep) => newIndex || currentStep + 1);
        return addData(formData);
      }
      return onSubmit({ ...data, ...formData });
    },
    [data, steps],
  );

  return (
    <Form
      inputs={steps[step]}
      onSubmit={stepForm}
      submitText={
        step < steps.length - 1
          ? nextStepText || 'Next'
          : submitText || 'Submit'
      }
      {...props}
    />
  );
}

MultiStepForm.propTypes = {};

export default MultiStepForm;
