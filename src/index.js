import Form from './Form';
import MultiStepForm from './Form/MultiStepForm';
import { MarkdownOutput } from './Input/CustomInputs/MarkdownText';
import Validator from './Validator';
import DateMaskConverters from './Validator/DateMaskConverters';

Form.MarkdownOutput = MarkdownOutput;
Form.Validator = Validator;
Form.DateMaskConverters = DateMaskConverters;
Form.MultiStepForm = MultiStepForm;

export default Form;
export { MarkdownOutput, Validator, DateMaskConverters, MultiStepForm };
