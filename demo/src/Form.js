import React, { Fragment, useState } from 'react';
import {
  useInputs,
  useInputsStyles,
  TextInput,
  Theme,
  NumberInput,
  CheckboxInput,
} from '../../src';

const Form = () => {
  const { inputs, formProps, stylesData } = useInputs({
    inputs: {
      one: {
        type: 'text',
        label: 'Text',
        placeholder: 'Text',
      },
      two: {
        type: 'number',
        label: 'Number',
        placeholder: '1234',
      },
      three: {
        type: 'checkbox',
        label: 'Checkbox',
      },
    },
    formId: 'form',
    onSubmit: async (data) => {
      console.log(data);
    },
  });

  const styles = useInputsStyles(stylesData);

  return (
    <Theme>
      <form {...formProps}>
        <TextInput {...inputs.one} style={styles.one} />
        <NumberInput {...inputs.two} style={styles.two} />
        <CheckboxInput {...inputs.three} style={styles.three} />
        <button type="submit">Submit</button>
      </form>
    </Theme>
  );
};

export default Form;
