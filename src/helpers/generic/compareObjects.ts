import { ReactElement } from 'react';
import { isEmpty } from 'lodash-es';
import isReactElement from './isReactElement';

type ComparableObject = { [key: string]: unknown };

export default function compareObjects(
  leftObject: ComparableObject | null | {},
  rightObject: ComparableObject | null | {},
  maxDepth = 3,
): boolean {
  if (leftObject === rightObject || !maxDepth) {
    return true;
  }

  if (
    !leftObject ||
    !rightObject ||
    typeof leftObject !== 'object' ||
    typeof rightObject !== 'object' ||
    isEmpty(leftObject) ||
    isEmpty(rightObject)
  ) {
    return false;
  }

  const leftKeys = Object.keys(leftObject).sort();
  const rightKeys = Object.keys(rightObject).sort();

  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  let leftValue;
  let rightValue;

  const response = leftKeys.every((key, index) => {
    if (key !== rightKeys[index]) {
      return false;
    }

    leftValue = (leftObject as ComparableObject)[key];
    rightValue = (rightObject as ComparableObject)[key];

    if (leftValue === rightValue) {
      return true;
    }

    if (!leftValue || !rightValue) {
      return false;
    }

    if (isReactElement(leftValue) && isReactElement(rightValue)) {
      return compareObjects(
        (leftValue as ReactElement).props,
        (leftValue as ReactElement).props,
        maxDepth - 1,
      );
    }

    if (isReactElement(leftValue) || isReactElement(rightValue)) {
      return false;
    }

    if (typeof leftValue === 'function' && typeof rightValue === 'function') {
      return true;
    }

    if (typeof leftValue === 'object' && typeof rightValue === 'object') {
      return compareObjects(
        leftValue as { [key: string]: unknown },
        rightValue as { [key: string]: unknown },
        maxDepth - 1,
      );
    }

    return false;
  });

  return response;
}
