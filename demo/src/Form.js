import React, { Fragment, useState } from 'react';
import { useInputs, useInputsStyles, TextInput, Theme } from '../../src';

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
    <Theme>
      <form {...formProps}>
        <TextInput {...inputs.one} style={styles.one} />
        <button type="submit">Submit</button>
      </form>
    </Theme>
  );
};

export default Form;
