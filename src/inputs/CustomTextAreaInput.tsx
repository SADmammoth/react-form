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

function _filterCommands(
  currentInput: string,
  macrosCollection: MacrosCollection[keyof MacrosCollection][],
  sliceIndex = 0,
  strictComparision = false,
): MacrosCollection[keyof MacrosCollection] | undefined {
  const input = currentInput.slice(
    currentInput.length - (sliceIndex + 1),
    currentInput.length,
  );
  const result = macrosCollection.filter(({ openingCommand }) => {
    return (
      input === openingCommand ||
      (!strictComparision && openingCommand.includes(input))
    );
  });
  const macrosesCount = Object.keys(result).length;
  if (sliceIndex + 1 >= currentInput.length || macrosesCount === 1) {
    if (!strictComparision) {
      return _filterCommands(currentInput, result, sliceIndex, true);
    }
    return result[0];
  }
  if (macrosesCount === 0) {
    if (!strictComparision && sliceIndex !== 0) {
      return _filterCommands(
        currentInput,
        macrosCollection,
        sliceIndex - 1,
        true,
      );
    }
    return;
  }
  return _filterCommands(currentInput, result, sliceIndex + 1);
}

function filterCommands(
  currentInput: string,
  macrosCollection: MacrosCollection,
) {
  return _filterCommands(currentInput, Object.values(macrosCollection));
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

  const [display, setDisplay] = useState<ReactNodeLike[]>([]);

  const currentInput = useRef<HTMLInputElement>();
  const [activeDisplayElement, setActiveDisplayElement] = useState<
    number | null
  >(null);
  const [input, setInput] = useState<string[]>([]);

  const onChange = (name: string, value: string) => {
    console.log(input);
    const newInput = [...input.slice(0, input.length - 1), `${value}`];

    const activeCommand = filterCommands(value, macrosCollection);
    if (activeCommand) {
      newInput.push('');
      const newComponent = activeCommand.commandEffect(
        '',
        //@ts-ignore
        currentInput,
        //@ts-ignore
        (event) => {
          setInput([
            ...newInput.slice(0, newInput.length - 1),
            event.target.value,
          ]);
        },
      );
      if (currentInput.current) {
        currentInput.current.innerHTML =
          currentInput.current?.innerHTML.replace(
            activeCommand.openingCommand,
            '',
          );
      }
      setDisplay([...display, newComponent]);
      setActiveDisplayElement(
        activeDisplayElement !== null ? activeDisplayElement + 1 : 0,
      );
    }
    setInput(newInput);
  };

  useEffect(() => {
    if (currentInput.current) {
      currentInput.current.focus();
    }
  }, [display]);

  useEffect(() => {
    console.log(input);
    updateValue(name, input.join(''));
  }, [input]);

  return (
    <div css={inputBoxStyle}>
      <div>
        <span
          contenteditable="true"
          style={{ width: '100%', height: '20px', display: 'inline-block' }}
          key={`init_input`}
          //@ts-ignore
          ref={activeDisplayElement === -1 ? currentInput : null}
          // css={inputStyle}
          name={name}
          placeholder={placeholder}
          onFocus={(event) => {
            setActiveDisplayElement(-1);
          }}
          onKeyUp={(event) => {
            //@ts-ignore
            onChange(name, event.target.innerHTML);
          }}
          onBlur={(event) => {
            //@ts-ignore
            setValue(name, input.join(''));
            setActiveDisplayElement(null);
          }}>
          {placeholder}
        </span>
        {display.length > 0
          ? display.reduce((acc, displayItem, i) => {
              return [
                ...(acc as ReactNodeLike[]),
                displayItem,
                <span
                  contenteditable="true"
                  key={`input-${i}`}
                  //@ts-ignore
                  ref={i + 1 === activeDisplayElement ? currentInput : null}
                  name={name}
                  placeholder={placeholder}
                  onFocus={(event) => {
                    setActiveDisplayElement(i);
                  }}
                  onKeyUp={(event) => {
                    console.log('HEEEY');
                    //@ts-ignore
                    onChange(name, event.target.innerHTML);
                  }}
                  onBlur={(event) => {
                    //@ts-ignore
                    setValue(name, input.join(''));
                    setActiveDisplayElement(null);
                  }}></span>,
              ];
            }, [])
          : []}
      </div>
      <Optional $={!!label}>
        <label htmlFor={id} css={labelStyle}>
          {label}
        </label>
      </Optional>
    </div>
  );
};

export default CustomTextAreaInput;
