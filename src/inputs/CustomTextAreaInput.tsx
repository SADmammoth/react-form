import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { css } from '@emotion/react';
import { ReactComponentLike, ReactNodeLike } from 'prop-types';
import { Optional } from '../helpers/Optional';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import {
  CommandEffect,
  CommandEffectType,
  MacrosCollection,
} from '../types/InputsProps/inputTypes/ICustomTextAreaInputProps';

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
  //Fix * and ** distinction
  return _filterCommands(currentInput, result, sliceIndex + 1);
}

function filterCommands(
  currentInput: string,
  macrosCollection: MacrosCollection,
) {
  return _filterCommands(currentInput, Object.values(macrosCollection));
}

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

  const [display, setDisplay] = useState<ReactNodeLike[]>([]);

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
      const newComponent = commandEffectHandler(
        `${formId}_${name}_${activeCommand.openingCommand}_${display.length}`,
        activeCommand,
        //@ts-ignore
        currentInput,
        //@ts-ignore
        (value) => {
          const detectedCommand = filterCommands(
            //@ts-ignore
            value,
            {
              activeCommand,
            },
          );
          if (detectedCommand) {
            console.log(
              activeDisplayElement !== null ? activeDisplayElement + 2 : 1,
            );
            // @ts-ignore
            setActiveDisplayElement(
              activeDisplayElement !== null ? activeDisplayElement + 2 : 1,
            );
          }
        },
      );

      console.log(newComponent);
      if (newComponent) {
        console.log(currentInput);
        if (currentInput.current) {
          currentInput.current.innerHTML =
            currentInput.current?.innerHTML.replace(
              activeCommand.openingCommand,
              '',
            );
        }
        setDisplay([...display, newComponent]);

        console.log(activeDisplayElement);
        setActiveDisplayElement(
          activeDisplayElement !== null ? activeDisplayElement + 1 : 0,
        );
      }
    }
    setInput(newInput);
  };

  function commandEffectHandler(
    commandId: string,
    activeCommand: MacrosCollection[keyof MacrosCollection],
    currentInput: RefObject<HTMLElement>,
    onChange: (value: string) => {},
  ): ReactNodeLike {
    const effect = activeCommand.commandEffect;
    switch (effect.type) {
      case CommandEffectType.Simple: {
        effect.callback();
        return;
      }
      case CommandEffectType.TextInput: {
        const Wrapper = effect.wrapper;
        return (
          <Wrapper
            contentEditable={true}
            key={commandId}
            //@ts-ignore
            ref={currentInput}
            //@ts-ignore
            onKeyUp={(event) => {
              //@ts-ignore
              onChange(event.target.innerHTML);
            }}
            //@ts-ignore
            onBlur={(event) => {
              //@ts-ignore
              event.target.innerHTML = event.target.innerHTML.replace(
                activeCommand.openingCommand,
                '',
              );
            }}></Wrapper>
        );
      }
      case CommandEffectType.CustomInput: {
        //@ts-ignore
        return effect.input(currentInput, (event) => {
          //@ts-ignore
          onChange(event.target.value);
          //@ts-ignore
          event.target.value = event.target.value.replace(
            activeCommand.openingCommand,
            '',
          );
        });
      }
      case CommandEffectType.Element: {
        return effect.element;
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
    console.log('FOCUS', activeDisplayElement, currentInput.current);
    if (currentInput.current) {
      currentInput.current.focus();
    }
  }, [currentInput.current, activeDisplayElement]);

  useEffect(() => {
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
          ? display.reduce((acc, displayItem, i) => {
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
        <label htmlFor={id} css={labelStyle}>
          {label}
        </label>
      </Optional>
    </div>
  );
};

export default CustomTextAreaInput;
