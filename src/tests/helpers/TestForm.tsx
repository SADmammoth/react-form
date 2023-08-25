import { useInputsComponents } from '../../hooks/useInputsComponents';
import Theme from '../../styles/helpers/Theme';
import { IFormProps } from '../../types/IFormProps';
import { InputsProps } from '../../types/InputsProps/InputsProps';

const TestForm = (props: IFormProps<InputsProps>) => {
  const { Inputs, formProps } = useInputsComponents(props);

  return (
    <Theme>
      <form data-testid="form" {...formProps}>
        {Object.entries(Inputs).map(([key, Input]) => (
          <div key={key} role="input" data-testid={key}>
            {Input}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </Theme>
  );
};

export default TestForm;
