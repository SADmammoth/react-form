import { useState } from 'react';
import { genrateRandomString } from 'src/helpers/generateRandomString';
import {
  IMacros,
  MacrosCollection,
} from '../../types/InputsProps/inputTypes/ICustomTextAreaInputProps';

export enum CommandDetectorStatus {
  Detected,
  TypingInProgress,
  Backtrack,
  None,
}

export type CommandDetectorResult =
  | {
      status: CommandDetectorStatus.Detected;
      command: IMacros;
    }
  | {
      status: CommandDetectorStatus.TypingInProgress;
    }
  | {
      status: CommandDetectorStatus.Backtrack;
      backtrackOverflow: string;
      command: IMacros;
    }
  | {
      status: CommandDetectorStatus.None;
    };

const commandPartialCheck = (
  commandToCheck: string,
  commandsInputBuffer: string,
) => {
  if (commandToCheck.length >= commandsInputBuffer.length) {
    return null;
  }
  for (let i = commandToCheck.length; i < commandsInputBuffer.length; i++) {
    console.log(i, commandToCheck, commandsInputBuffer.substring(0, i));
    if (commandToCheck === commandsInputBuffer.substring(0, i)) {
      return commandsInputBuffer.substring(i, commandsInputBuffer.length);
    }
  }
  return null;
};

const checkForCommands = (
  commandsInputBuffer: string,
  macrosCollection: MacrosCollection,
): IMacros[] | null => {
  const foundCommands = Object.values(macrosCollection).filter(
    ({ openingCommand }) => {
      return openingCommand.startsWith(commandsInputBuffer);
    },
  );
  return foundCommands.length ? foundCommands : null;
};

export const useCommandDetector = (macrosCollection: MacrosCollection) => {
  const [commandInputBuffer, setCommandInputBuffer] = useState('');
  return (value: string, valueDiff: string) => {
    const newCommandBuffer = commandInputBuffer + valueDiff;
    const detectedCommands = checkForCommands(
      newCommandBuffer,
      macrosCollection,
    );
    if (valueDiff.length > 1) {
      console.log('NONE');
      // Not a character
      setCommandInputBuffer('');
      return { status: CommandDetectorStatus.None };
    }

    if (detectedCommands) {
      if (
        detectedCommands.length === 1 &&
        detectedCommands[0].openingCommand === newCommandBuffer
      ) {
        const expectedCommand = detectedCommands[0].openingCommand;
        console.log('DETECTED');
        setCommandInputBuffer('');
        return {
          status: CommandDetectorStatus.Detected,
          command: detectedCommands[0],
        };
      }

      console.log('SAVING');
      // Multiple commands partial match detected, user is, possibly, typing a command
      setCommandInputBuffer(newCommandBuffer);
      return { status: CommandDetectorStatus.TypingInProgress };
    }

    //FIXME Dont use command buffer, to process case  * > * > backspace > any key
    const partialCommand = Object.values(macrosCollection)
      .filter(({ openingCommand }) =>
        commandPartialCheck(openingCommand, newCommandBuffer),
      )
      .reduce(
        (longestCommand, foundCommand) =>
          longestCommand === null ||
          foundCommand.openingCommand.length >
            longestCommand.openingCommand.length
            ? foundCommand
            : longestCommand,
        null as IMacros | null,
      );
    if (
      partialCommand &&
      newCommandBuffer.length - partialCommand.openingCommand.length === 1
    ) {
      // Command not detected, but user's previous input matched the command
      const backtrackOverflow = newCommandBuffer.substring(
        partialCommand.openingCommand.length,
        newCommandBuffer.length,
      );
      //Fix special actions (backspace, etc)
      console.log('BACKTRACK', partialCommand, backtrackOverflow);
      const overflowLength = backtrackOverflow.length;

      setCommandInputBuffer('');
      return {
        status: CommandDetectorStatus.Backtrack,
        backtrackOverflow,
        command: partialCommand,
      };
    }

    console.log('NONE2');
    setCommandInputBuffer('');
    return { status: CommandDetectorStatus.None };
  };
};
