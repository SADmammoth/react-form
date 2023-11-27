import React, { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { ReactNodeLike } from 'prop-types';
import { MacrosCollection } from 'src/types/InputsProps/inputTypes/ICustomTextAreaInputProps';
import { Optional } from '../helpers/Optional';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';

function filterCommands(
  currentInput: string,
  macrosCollection: MacrosCollection,
) {
  return Object.fromEntries(
    Object.entries(macrosCollection).filter(([key, { openingCommand }]) => {
      return currentInput === openingCommand;
    }),
  );
}

// function filterOpenCommands(
//   currentInput: string,
//   macrosCollection: MacrosCollection,
// ) {
//   return Object.values(macrosCollection).filter(({ closingCommand }) => {
//     return currentInput === closingCommand;
//   });
// }

function appendDisplayValue(
  currentDisplayValue: ReactNodeLike[],
  currentInputBuffer: ReactNodeLike,
) {
  console.log(typeof currentDisplayValue[currentDisplayValue.length - 1]);
  if (!currentDisplayValue[currentDisplayValue.length - 1]) {
    return [currentInputBuffer];
  }
  if (
    typeof currentDisplayValue[currentDisplayValue.length - 1] === 'string' &&
    typeof currentInputBuffer === 'string'
  ) {
    return [
      ...currentDisplayValue.slice(0, currentDisplayValue.length - 1),
      currentDisplayValue[currentDisplayValue.length - 1] + currentInputBuffer,
    ];
  }
  return [...currentDisplayValue, currentInputBuffer];
}

const CustomTextAreaInput = ({
  type,
  label,
  name,
  formId,
  placeholder,
  value,
  setValue,
  updateValue,
  disabled,
  required,
  style,
  macrosCollection,
}: InputComponentProps<InputsProps, InputType.CustomTextArea>) => {
  const id = formId + name;

  const inputStyle = style ? style.root : null;
  const inputBoxStyle = style ? style.inputBox : null;
  const labelStyle = style ? style.label : null;

  const [outdatedInputBuffer, setOutdatedInputBuffer] = useState<
    string | undefined
  >(value);
  const [currentInputBuffer, setCurrentInputBuffer] = useState<
    string | undefined
  >();
  const [displayValue, setDisplayValue] = useState<ReactNodeLike[]>(
    value ? [value] : [],
  );

  const onInput = useCallback(
    (currentValue: string) => {
      setCurrentInputBuffer(currentValue.slice(outdatedInputBuffer?.length));
    },
    [outdatedInputBuffer],
  );

  const [openCommands, setOpenCommands] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      if (!currentInputBuffer) {
        return;
      }
      const activeCommands = filterCommands(
        currentInputBuffer,
        macrosCollection,
      );

      const activeCommandsCount = Object.values(activeCommands).length;

      if (openCommands.length > 0) {
        openCommands.reverse().find((key) => {
          return macrosCollection[key].closingCommand === currentInputBuffer;
        });
      }
      if (activeCommandsCount === 0) {
        console.log(outdatedInputBuffer + currentInputBuffer);
        setOutdatedInputBuffer(
          (outdatedInputBuffer ?? '') + currentInputBuffer,
        );
        setDisplayValue(appendDisplayValue(displayValue, currentInputBuffer));
        setCurrentInputBuffer('');
        return;
      }
      if (activeCommandsCount === 1) {
        const activeCommandKey = Object.keys(activeCommands)[0];
        const { commandEffect } = activeCommands[activeCommandKey];
        setOpenCommands([...openCommands, activeCommandKey]);
        const macrosResult = await commandEffect(currentInputBuffer.slice(1));
        setDisplayValue(appendDisplayValue(displayValue, macrosResult));
        setOutdatedInputBuffer(
          (outdatedInputBuffer ?? '') + currentInputBuffer,
        );
        setCurrentInputBuffer('');
        return;
      }
      setDisplayValue([displayValue, currentInputBuffer]);
    })();
  }, [currentInputBuffer]);

  return (
    <div css={inputBoxStyle}>
      <input
        css={inputStyle}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={(event) => {
          onInput(event.target.value);
          //@ts-ignore
          updateValue(name, event.target.value);
        }}
        onBlur={(event) => {
          //@ts-ignore
          setValue(name, event.target.value);
        }}
        disabled={disabled}
        required={required}
      />
      <Optional $={!!label}>
        <label htmlFor={id} css={labelStyle}>
          {label}
        </label>
      </Optional>
      <div>{displayValue}</div>
    </div>
  );
};

export default CustomTextAreaInput;
