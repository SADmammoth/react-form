import { genrateRandomString } from '../../../helpers/generateRandomString';
import {
  CommandEffectType,
  IMacros,
  MacrosCollection,
} from '../../../types/InputsProps/inputTypes/ICustomTextAreaInputProps';

export type MacrosCommand = string;

export const macrosCollectionToCommands = (
  macrosCollection: MacrosCollection,
): MacrosCommand[] => {
  return Object.values(macrosCollection).map(
    ({ openingCommand }) => openingCommand,
  );
};

export const commandToMacros = (
  command: MacrosCommand,
  macrosCollection: MacrosCollection,
): IMacros => {
  return Object.values(macrosCollection).find(
    ({ openingCommand }) => openingCommand === command,
  ) as IMacros;
};

export const createClosingMacros = (
  command: string,
  closeCallback: (value: string) => void,
): [name: string, macros: IMacros] => {
  const commandId = genrateRandomString(6);
  return [
    'closing_command_' + commandId,
    {
      openingCommand: command,
      commandEffect: {
        type: CommandEffectType.FunctionCall,
        function: closeCallback,
      },
    },
  ];
};

export const createClosingMacroses = (
  commands: string[],
  closeCallback: (value: string) => void,
): MacrosCollection => {
  return Object.fromEntries(
    commands.map((command) => {
      return createClosingMacros(command, closeCallback);
    }),
  );
};

export const addClosingMacroses = (
  macrosCollection: MacrosCollection,
  closingCommands: string[],
  closeCallback: (value: string) => void,
): MacrosCollection => {
  const collectionEntries = [
    ...Object.entries(macrosCollection).filter(
      ([, { openingCommand }]) => !closingCommands.includes(openingCommand),
    ),
    ...closingCommands.map((command) => {
      return createClosingMacros(command, closeCallback);
    }),
  ];
  return Object.fromEntries(collectionEntries);
};
