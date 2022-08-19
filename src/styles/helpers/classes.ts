import { Interpolation, SerializedStyles, Theme } from '@emotion/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import themeConfig from './themeConfig';

export type Classes = { [key: string]: Interpolation<Theme> };
export type ProcessedClasses<T> = {
  [Key in keyof T]: SerializedStyles;
};

function classes<T extends Classes>(arg: T): ProcessedClasses<T> {
  const entries = Object.entries(arg).map(([key, value]) => [
    key,
    (value instanceof Function
      ? value(themeConfig)
      : value) as Interpolation<Theme>,
  ]);
  return Object.fromEntries(entries);
}

export default classes;
