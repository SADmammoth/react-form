import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { css } from '@emotion/react';
import { ReactNodeLike } from 'prop-types';
import { Optional } from '../../helpers/Optional';
import { InputComponentProps } from '../../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../../types/InputsProps/InputsProps';
import { InputType } from '../../types/InputsProps/atomic/InputType';
import {
  CommandEffectType,
  IMacros,
} from '../../types/InputsProps/inputTypes/ICustomTextAreaInputProps';
import NestedTextInput from './NestedTextInput';
import { filterCommands } from './filterCommands';

const CustomTextAreaInput = (
  props: InputComponentProps<InputsProps, InputType.CustomTextArea>,
) => {
  const {
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
  } = props;
  const id = formId + name;

  const inputStyle = style ? style.root : null;
  const inputBoxStyle = style ? style.inputBox : null;
  const labelStyle = style ? style.label : null;

  const [display, setDisplay] = useState<IMacros[]>([]);

  const currentInput = useRef<HTMLInputElement>();
  const [activeDisplayElement, setActiveDisplayElement] = useState<
    number | null
  >(null);
  const [input, setInput] = useState<string[]>([]);

  const onChange = (name: string, value: string) => {
    const newInput = [...input.slice(0, input.length - 1), `${value}`];

    const activeCommand = filterCommands(value, macrosCollection);
    if (activeCommand) {
      newInput.push('');
      setDisplay([...display, activeCommand]);
      if (currentInput.current) {
        currentInput.current.innerHTML =
          currentInput.current?.innerHTML.replace(
            activeCommand.openingCommand,
            '',
          );
      }
      setActiveDisplayElement(
        activeDisplayElement !== null ? activeDisplayElement + 1 : -1,
      );
    }
    setInput(newInput);
  };

  const onClose = (placeholderElement?: ReactNodeLike) => {
    setActiveDisplayElement(
      activeDisplayElement !== null ? activeDisplayElement + 1 : -1,
    );
  };

  function commandEffectHandler(
    commandId: string,
    activeCommand: IMacros,
    currentInput: RefObject<HTMLElement>,
    isActive: boolean,
  ): ReactNodeLike {
    const effect = activeCommand.commandEffect;
    switch (effect.type) {
      case CommandEffectType.Simple: {
        effect.callback();
        return;
      }
      case CommandEffectType.TextInput: {
        return (
          <NestedTextInput
            wrapper={effect.wrapper}
            activeCommand={activeCommand}
            commandId={commandId}
            onClose={onClose}
            ref={currentInput}
            isActive={isActive}
          />
        );
      }
      case CommandEffectType.CustomInput: {
        //@ts-ignore
        return effect.input(
          currentInput,
          (event) => {
            //@ts-ignore
            onChange(event.target.value);
            //@ts-ignore
            event.target.value = event.target.value.replace(
              activeCommand.openingCommand,
              '',
            );
          },
          onClose,
          isActive,
        );
      }
      case CommandEffectType.Self: {
        throw new Error('Not implemented');
      }
      default: {
        return;
      }
    }
  }

  useEffect(() => {
    if (currentInput.current) {
      currentInput.current.focus();
    }
  }, [currentInput.current, activeDisplayElement]);

  useEffect(() => {
    console.log(activeDisplayElement);
  }, [activeDisplayElement]);

  useEffect(() => {
    updateValue(name, input.join(''));
  }, [input]);

  return (
    <div css={inputBoxStyle}>
      <div>
        <span
          contenteditable="true"
          key={`init_input`}
          //@ts-ignore
          ref={activeDisplayElement === -1 ? currentInput : null}
          // css={inputStyle}
          name={name}
          placeholder={placeholder}
          onFocus={(event) => {
            if (activeDisplayElement !== -1) setActiveDisplayElement(-1);
          }}
          onKeyUp={(event) => {
            //@ts-ignore
            onChange(name, event.target.innerHTML);
          }}
          onBlur={(event) => {
            //@ts-ignore
            setValue(name, input.join(''));
          }}>
          {placeholder}
        </span>
        {display.length > 0
          ? //@ts-ignore
            display.reduce((acc, displayItem, i) => {
              return [
                ...(acc as ReactNodeLike[]),
                commandEffectHandler(
                  `item-${i}`,
                  displayItem,
                  //@ts-ignore
                  currentInput,
                  2 * i === activeDisplayElement,
                ),
                <span
                  contenteditable="true"
                  key={`input-${i}`}
                  //@ts-ignore
                  ref={2 * i + 1 === activeDisplayElement ? currentInput : null}
                  name={name}
                  placeholder={placeholder}
                  // onFocus={(event) => {
                  //   if (activeDisplayElement !== i + 1)
                  //     setActiveDisplayElement(i + 1);
                  // }}
                  onKeyUp={(event) => {
                    //@ts-ignore
                    onChange(name, event.target.innerHTML);
                  }}
                  onBlur={(event) => {
                    //@ts-ignore
                    setValue(name, input.join(''));
                  }}></span>,
              ];
            }, [])
          : []}
      </div>
      <Optional $={!!label}>
        <label
          htmlFor={id}
          css={labelStyle}
          onClick={() => setActiveDisplayElement(-1)}>
          {label}
        </label>
      </Optional>
    </div>
  );
};

export default CustomTextAreaInput;
