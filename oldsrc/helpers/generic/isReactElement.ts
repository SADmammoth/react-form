import React from 'react';

export default function isReactElement(object: unknown): boolean {
  if (typeof object === 'object' && React.isValidElement(object)) {
    return true;
  }

  return false;
}
