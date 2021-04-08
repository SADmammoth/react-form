import React from 'react';

export default function isReactElement(object) {
  if (React.isValidElement(object)) {
    return true;
  }

  return false;
}
