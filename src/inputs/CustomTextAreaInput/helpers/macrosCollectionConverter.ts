import {
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
