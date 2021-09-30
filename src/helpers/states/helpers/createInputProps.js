import getConverters from './getConverters';
import getValidators from './getValidators';

export default function createInputProps(
  {
    type,
    name,
    className,
    description,
    required,
    label,
    placeholder,
    attributes,
    byCharValidator,
    validator,
    valueOptions,
    minSymbols,
    maxSymbols,
    mask,
    maskType,
    validationMessage,
    onChange,
    onInput,
    alwaysShowTip,
    editable,
    markdownFeatures,
    allowScroll,
    converters,
    accept,
    actionButton,
    min,
    max,
    step,
    hidden,
    disabled,
    control,
    invalid,
  },
  valuesState,
  { render, formId, updateValue, highlightInput },
) {
  const onChangeHandler = (inputName, value) => {
    if (onChange) {
      onChange(inputName, value);
    }

    updateValue(inputName, value);
  };

  const onInputHandler = (inputName, value) => {
    if (onInput) {
      onInput(inputName, value);
    }

    updateValue(inputName, value);
  };

  validator = getValidators(validator, byCharValidator);
  converters = getConverters(converters);

  return {
    id: name + formId,
    key: name + formId,
    type,
    name,
    className,
    description,
    onInput: onInputHandler,
    onChange: onChangeHandler,
    mask,
    maskType,
    ...validator,
    required,
    label,
    placeholder,
    attributes,
    value: valuesState[name]?.value,
    valueOptions,
    minSymbols,
    maxSymbols,
    invalid,
    highlightInput,
    validationMessage,
    alwaysShowTip,
    editable,
    render,
    markdownFeatures,
    allowScroll,
    converters,
    accept,
    actionButton,
    min,
    max,
    step,
    hidden,
    disabled,
    control,
  };
}
