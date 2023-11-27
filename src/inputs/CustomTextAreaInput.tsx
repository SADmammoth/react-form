import React, { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { ReactNodeLike } from 'prop-types';
import { Optional } from '../helpers/Optional';
import { useMacrosCommandTree } from '../helpers/useMacrosCommandTree';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { MacrosCollection } from '../types/InputsProps/inputTypes/ICustomTextAreaInputProps';

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

  const { reactNode, createNewContext, textInput, exitContext } =
    useMacrosCommandTree(macrosCollection);

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
        const closingCommand = openCommands.reverse().find((key) => {
          return macrosCollection[key].closingCommand === currentInputBuffer;
        });
        if (closingCommand) {
          exitContext();
        }
      }
      if (activeCommandsCount === 0) {
        setOutdatedInputBuffer(
          (outdatedInputBuffer ?? '') + currentInputBuffer,
        );
        textInput(currentInputBuffer);
        setCurrentInputBuffer('');
        return;
      }
      if (activeCommandsCount === 1) {
        const activeCommandKey = Object.keys(activeCommands)[0];
        const { commandEffect } = activeCommands[activeCommandKey];
        setOpenCommands([...openCommands, activeCommandKey]);
        const macrosResult = await commandEffect(currentInputBuffer.slice(1));
        createNewContext(activeCommandKey, -1);
        setOutdatedInputBuffer(
          (outdatedInputBuffer ?? '') + currentInputBuffer,
        );
        setCurrentInputBuffer('');
        return;
      }
      //   textInput(currentInputBuffer);
    })();
  }, [currentInputBuffer]);

  return (
    <div css={inputBoxStyle}>
      <textarea
        css={inputStyle}
        id={id}
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
      <div>{reactNode}</div>
    </div>
  );
};

export default CustomTextAreaInput;
