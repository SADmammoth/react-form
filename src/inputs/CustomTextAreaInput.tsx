import React, { useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { ReactNodeLike } from 'prop-types';
import ContentEditable from 'react-contenteditable';
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
  >('');

  const { reactNode, createNewContext, textInput, exitContext, offsetIndex } =
    useMacrosCommandTree(macrosCollection);

  const [caretIndex, setCaretIndex] = useState(value ? value.length - 1 : 0);

  // const onInput = useCallback(
  //   (currentValue: string, selectionStart: number) => {
  //     offsetIndex(selectionStart - caretIndex - 1);
  //     setCaretIndex(selectionStart);
  //     setCurrentInputBuffer(currentValue.slice(outdatedInputBuffer?.length));
  //   },
  //   [outdatedInputBuffer, caretIndex],
  // );

  const [displayValue, setDisplayValue] = useState<ReactNodeLike[]>([]);

  const input = useRef(null);

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
      // if (openCommands.length > 0) {
      //   const closingCommand = openCommands.reverse().find((key) => {
      //     return macrosCollection[key].closingCommand === currentInputBuffer;
      //   });
      //   if (closingCommand) {
      //     exitContext();
      //   }
      // }
      if (activeCommandsCount === 0) {
        // setOutdatedInputBuffer(
        //   (outdatedInputBuffer ?? '') + currentInputBuffer,
        // );
        textInput(currentInputBuffer);
        setCurrentInputBuffer('');
        return;
      }
      if (activeCommandsCount === 1) {
        const activeCommandKey = Object.keys(activeCommands)[0];
        const { commandEffect } = activeCommands[activeCommandKey];
        // setOpenCommands([...openCommands, activeCommandKey]);
        const macrosResult = await commandEffect(currentInputBuffer.slice(1));
        createNewContext(activeCommandKey, -1);
        // setOutdatedInputBuffer(
        //   (outdatedInputBuffer ?? '') + currentInputBuffer,
        // );
        //@ts-ignore
        document.execCommand('insertHtml', false, '<i>');
        setCurrentInputBuffer('');
        return;
      }
      textInput(currentInputBuffer);
    })();
  }, [currentInputBuffer]);

  // useEffect(() => {
  //   text.current = '';
  //   //@ts-ignore
  // }, [reactNode]);
  // console.log('werwe', reactNode);
  const text = useRef('');

  return (
    <div css={inputBoxStyle}>
      {/* <div
        ref={input}
        css={inputStyle}
        id={id}
        placeholder={placeholder}
        contentEditable={true}
        onInput={(event) => {
          const {
            //@ts-ignore
            nativeEvent: { data, inputType },
          } = event;
          switch (inputType) {
            case 'insertText': {
              setCurrentInputBuffer(currentInputBuffer + data);
              break;
            }
            case 'deleteContentBackward': {
              setCurrentInputBuffer(currentInputBuffer?.slice(-1));
              break;
            }
            case 'deleteContentForward': {
              break;
            }
          }
          return false;
        }}
        //@ts-ignore
        dangerouslySetInnerHTML={{ __html: reactNode.join('') }}
        onChange={(event) => {
          console.log(event);
          // onInput(event.target.value, event.target.selectionStart);
          //@ts-ignore
          // updateValue(name, event.target.value);
        }}
        // onBlur={(event) => {
        //   //@ts-ignore
        //   setValue(name, event.target.value);
        // }}
      ></div> */}
      <ContentEditable
        html={text.current}
        onChange={(event) => {
          const {
            //@ts-ignore
            nativeEvent: { data, inputType },
          } = event;
          switch (inputType) {
            case 'insertText': {
              setCurrentInputBuffer(currentInputBuffer + data);
              break;
            }
            case 'deleteContentBackward': {
              setCurrentInputBuffer(currentInputBuffer?.slice(-1));
              break;
            }
            case 'deleteContentForward': {
              break;
            }
          }
          //@ts-ignore
          text.current = event.target.value;
        }}
      />
      <Optional $={!!label}>
        <label htmlFor={id} css={labelStyle}>
          {label}
        </label>
      </Optional>
    </div>
  );
};

export default CustomTextAreaInput;
