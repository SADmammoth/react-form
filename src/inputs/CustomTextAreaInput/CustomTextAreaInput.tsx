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
  MacrosCollection,
} from '../../types/InputsProps/inputTypes/ICustomTextAreaInputProps';
import NestedTextInput from './NestedTextInput';
import { filterCommands } from './filterCommands';

type DisplayItem =
  | {
      type: 'item';
      content: IMacros;
    }
  | { type: 'placeholder'; content: ReactNodeLike };

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

  const [display, setDisplay] = useState<DisplayItem[]>([]);

  const currentInput = useRef<HTMLInputElement>();
  const [activeDisplayElement, setActiveDisplayElement] = useState<
    number | null
  >(null);
  const [input, setInput] = useState<string[]>([]);

  const onChange = (value: string) => {
    const newInput = [...input.slice(0, input.length - 1), `${value}`];

    const activeCommand = filterCommands(value, macrosCollection);
    if (activeCommand) {
      newInput.push('');
      setDisplay([...display, { type: 'item', content: activeCommand }]);
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

  const onClose = (finalValue: string, placeholderElement?: ReactNodeLike) => {
    setInput([...input.slice(0, input.length - 1), `${finalValue}`, '']);
    if (placeholderElement) {
      setDisplay([
        ...display.slice(0, display.length - 1),
        { type: 'placeholder', content: placeholderElement },
      ]);
    }
    setActiveDisplayElement(
      activeDisplayElement !== null ? activeDisplayElement + 1 : -1,
    );
  };

  function commandEffectHandler(
    commandId: string,
    activeCommand: IMacros,
    currentInput: RefObject<HTMLElement>,
    isActive: boolean,
    onChange: (value: string) => void,
    onClose: (finalValue: string, placeholderElement?: ReactNodeLike) => void,
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
            onChange={onChange}
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
            // event.target.value = event.target.value.replace(
            //   activeCommand.openingCommand,
            //   '',
            // );
          },
          onClose,
          (input, macroses) =>
            filterCommands(
              input,
              macroses
                ? (Object.fromEntries(
                    macroses.map((macros) => {
                      return [macros, { openingCommand: macros }];
                    }),
                  ) as MacrosCollection)
                : macrosCollection,
            )?.openingCommand,
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
            onChange(event.target.innerHTML);
          }}
          onBlur={(event) => {
            //@ts-ignore
            setValue(name, input.join(''));
          }}>
          {placeholder}
        </span>
        {display.length > 0
          ? //@ts-ignore
            display.reduce((acc, { type, content }, i) => {
              let displayItem;

              switch (type) {
                case 'item':
                  displayItem = commandEffectHandler(
                    `item-${i}`,
                    content,
                    //@ts-ignore
                    currentInput,
                    2 * i === activeDisplayElement,
                    onChange,
                    onClose,
                  );
                  break;
                case 'placeholder':
                  displayItem = content;
                  break;
              }

              return [
                ...(acc as ReactNodeLike[]),
                displayItem,
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
                    onChange(event.target.innerHTML);
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
