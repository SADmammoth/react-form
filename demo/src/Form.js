import React, { Fragment, useState } from 'react';
import { useInputs } from '../../src';
import { useInputsStyles } from '../../src/hooks/useInputsStyles';
import TextInput from '../../src/inputs/TextInput';

const Form = () => {
  const { inputs, formProps, stylesData } = useInputs({
    inputs: {
      one: {
        type: 'text',
        label: 'Label',
        placeholder: 'Label',
      },
    },
    formId: 'form',
    onSubmit: async (data) => {
      console.log(data);
    },
  });

  const styles = useInputsStyles(stylesData);

  return (
    <form {...formProps}>
      <TextInput {...inputs.one} style={styles.one} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
