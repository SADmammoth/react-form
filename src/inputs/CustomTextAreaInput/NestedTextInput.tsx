import React, { useMemo } from 'react';
import { ReactComponentLike, ReactNodeLike } from 'prop-types';
import { IMacros } from 'src/types/InputsProps/inputTypes/ICustomTextAreaInputProps';
import { removeCommandFromString } from './helpers/removeCommandFromString';
import {
  CommandDetectorStatus,
  useCommandDetector,
} from './hooks/useCommandDetector';

interface INestedTextInputProps {
  id: string;
  wrapper?: ReactComponentLike;
  command: IMacros;
  onInput: (value: string) => void;
  onChange: (value: string, focusNext?: boolean) => void;
  placeholder?: string;
  closingCommands?: string[] | null;
}

const NestedTextInput = React.forwardRef<HTMLElement, INestedTextInputProps>(
  (
    {
      id,
      wrapper,
      placeholder,
      onInput,
      onChange,
      command,
      closingCommands: closingCommandsProps,
    },
    currentInput,
  ) => {
    const Wrapper = wrapper;
    const closingCommands = useMemo<string[]>(() => {
      return closingCommandsProps === null
        ? []
        : closingCommandsProps === undefined
        ? [command.openingCommand]
        : closingCommandsProps;
    }, [command, closingCommandsProps]);
    const commandDetector = useCommandDetector(closingCommands, false);

    const internalOnInput = (value: string, valueDiff: string) => {
      onInput(value);

      const commandData = commandDetector(value, valueDiff);

      if (
        commandData.status === CommandDetectorStatus.Detected ||
        commandData.status === CommandDetectorStatus.Backtrack
      ) {
        onChange(value, true);
        return removeCommandFromString(
          value,
          commandData.command,
          'backtrackOverflow' in commandData
            ? commandData.backtrackOverflow
            : '',
        );
      }
      return value;
    };

    const input = (
      <input
        type="text"
        placeholder={placeholder}
        onKeyUp={(event) => {
          const target = event.currentTarget;
          target.value = internalOnInput(target.value, event.key);
        }}
        onBlur={(event) => onChange(event.target.value, false)}
      />
    );

    return Wrapper ? <Wrapper>{input}</Wrapper> : input;
  },
);

export default NestedTextInput;
