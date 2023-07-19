import { useMemo } from 'react';
import { getStyleByType } from '../helpers/getStyleByType';
import { InputStyle } from '../types/InputStyle';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { StylesData } from '../types/StylesData';

export const useInputsStyles = <Props extends InputsProps>(
  stylesData: StylesData<Props>,
): InputStyle<Props> => {
  const inputStyles = useMemo(() => {
    return Object.fromEntries(
      Object.entries(stylesData).map(
        ([name, type]: [name: keyof Props, type: InputType]) => [
          name,
          getStyleByType(type),
        ],
      ),
    ) as InputStyle<Props>;
  }, [stylesData]);
  return inputStyles;
};
