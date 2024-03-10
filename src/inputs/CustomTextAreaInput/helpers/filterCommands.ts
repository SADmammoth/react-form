import {
  IMacros,
  MacrosCollection,
} from 'src/types/InputsProps/inputTypes/ICustomTextAreaInputProps';

function _filterCommands(
  currentInput: string,
  macrosCollection: IMacros[],
  sliceIndex = 0,
  strictComparision = false,
): IMacros | undefined {
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

export function filterCommands(
  currentInput: string,
  macrosCollection: MacrosCollection,
) {
  return _filterCommands(currentInput, Object.values(macrosCollection));
}
