import convertersMap from '../../Validator/convertersMap';
import validatorsMap from '../../Validator/validatorsMap';

export default function createInputProps(
  {
    type,
    name,
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
  },
  updateValueCallback,
  valuesState,
  highlightInput,
  additionalFields,
) {
  const { render } = additionalFields;

  const onChangeHandler = (inputName, value) => {
    if (onChange) {
      onChange(inputName, value);
    }

    updateValueCallback(inputName, value);
  };

  const onInputHandler = (inputName, value) => {
    if (onInput) {
      onInput(inputName, value);
    }

    updateValueCallback(inputName, value);
  };

  let validatorFromMap;
  if (typeof validator === 'string') {
    validatorFromMap = validatorsMap[validator] || {};
  }

  let convertersFromMap;

  if (typeof converters === 'string') {
    convertersFromMap = convertersMap[converters];
  }

  return {
    id: valuesState[name].id,
    key: valuesState[name].id,
    type,
    name,
    description,
    onInput: onInputHandler,
    onChange: onChangeHandler,
    mask,
    maskType,
    validator,
    byCharValidator,
    ...validatorFromMap,
    required,
    label,
    placeholder,
    attributes,
    value: valuesState[name].value,
    valueOptions,
    minSymbols,
    maxSymbols,
    invalid: !!valuesState[name].invalid,
    highlightInput,
    validationMessage,
    alwaysShowTip,
    editable,
    render,
    markdownFeatures,
    allowScroll,
    converters: convertersFromMap || converters,
    accept,
    actionButton,
  };
}
