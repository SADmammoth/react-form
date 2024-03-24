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
): [name: string, macros: IMacros] => {
  const commandId = genrateRandomString(6);
  return [
    'closing_command_' + commandId,
    {
      openingCommand: command,
      commandEffect: {
        type: CommandEffectType.ClosingCommand,
      },
    },
  ];
};

export const createClosingMacroses = (commands: string[]): MacrosCollection => {
  return Object.fromEntries(
    commands.map((command) => {
      return createClosingMacros(command);
    }),
  );
};

export const addClosingMacroses = (
  macrosCollection: MacrosCollection,
  closingCommands: string[],
): MacrosCollection => {
  const collectionEntries = [
    ...Object.entries(macrosCollection).filter(
      ([, { openingCommand }]) => !closingCommands.includes(openingCommand),
    ),
    ...closingCommands.map((command) => {
      return createClosingMacros(command);
    }),
  ];
  return Object.fromEntries(collectionEntries);
};

export const filterClosingCommands = (
  macrosCollection: MacrosCollection,
): MacrosCollection => {
  return Object.fromEntries(
    Object.entries(macrosCollection).filter(
      ([
        key,
        {
          commandEffect: { type },
        },
      ]) => type !== CommandEffectType.ClosingCommand,
    ),
  );
};
