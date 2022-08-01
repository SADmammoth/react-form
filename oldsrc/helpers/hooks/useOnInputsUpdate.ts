import { useEffect } from 'react';
import mapGroups from '@/outputHelpers/mapGroups';
import mapList from '@/outputHelpers/mapList';
import {
  InputsState,
  OnInputUpdateCallback,
  SharedInputProps,
  ValuesState,
} from '../types/basic';

export default function useOnInputsUpdate(
  inputs: InputsState,
  values: ValuesState,
  sharedInputProps: SharedInputProps,
  onInputsUpdate: OnInputUpdateCallback,
): void {
  useEffect(() => {
    const components = mapGroups(inputs, values, sharedInputProps);

    onInputsUpdate({
      ...components,
      $list: mapList(inputs, values, sharedInputProps),
    });
  }, [inputs, values]);
}
