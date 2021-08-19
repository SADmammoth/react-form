import Validator from '@/Validator';
import DateMaskConverters from '@/Validator/DateMaskConverters';
import Form from '@/basic/Form';
import MultiStepForm from '@/basic/MultiStepForm';
import { MarkdownOutput } from '@/basic/customInputs/MarkdownText';

Form.MarkdownOutput = MarkdownOutput;
Form.Validator = Validator;
Form.DateMaskConverters = DateMaskConverters;
Form.MultiStepForm = MultiStepForm;

export default Form;
export { MarkdownOutput, Validator, DateMaskConverters, MultiStepForm };
