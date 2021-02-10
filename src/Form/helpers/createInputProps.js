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
    highlightInput,
  },
  updateValueCallback,
  valuesState,
  renderLoader
) {
  const higlightInputCallback = () => highlightInput(name);

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

  return {
    id: valuesState[name].id,
    type,
    name,
    description,
    onInput: onInputHandler,
    onChange: onChangeHandler,
    mask,
    maskType,
    validator,
    byCharValidator,
    required,
    label,
    placeholder,
    attributes,
    value: valuesState[name].value,
    valueOptions,
    minSymbols,
    maxSymbols,
    invalid: !!valuesState[name].invalid,
    highlightInput: higlightInputCallback,
    validationMessage,
    alwaysShowTip,
    editable,
    renderLoader,
  };
}
