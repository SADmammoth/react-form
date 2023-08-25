import { useInputsComponents } from '../../hooks/useInputsComponents';
import Theme from '../../styles/helpers/Theme';
import { IFormProps } from '../../types/IFormProps';
import { InputsProps } from '../../types/InputsProps/InputsProps';

const TestForm = (props: IFormProps<InputsProps>) => {
  const { Inputs, formProps } = useInputsComponents(props);

  return (
    <Theme>
      <form data-testid="form" {...formProps}>
        {Object.keys(Inputs).map((key) => {
          const MyInput = Inputs[key];
          return (
            <div role="input" data-testid={key}>
              {/*@ts-ignore*/}
              <MyInput key={key} />
            </div>
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </Theme>
  );
};

export default TestForm;
