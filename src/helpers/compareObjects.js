import isReactElement from './isReactElement';

export default function compareObjects(leftObject, rightObject, maxDepth = 3) {
  if (leftObject === rightObject || !maxDepth) {
    return true;
  }

  if (
    !leftObject ||
    !rightObject ||
    typeof leftObject !== 'object' ||
    typeof rightObject !== 'object'
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

    leftValue = leftObject[key];
    rightValue = rightObject[key];

    if (leftValue === rightValue) {
      return true;
    }

    if (!leftValue || !rightValue) {
      return false;
    }

    if (isReactElement(leftValue) && isReactElement(rightValue)) {
      return compareObjects(leftValue.props, rightValue.props, maxDepth - 1);
    }

    if (isReactElement(leftValue) || isReactElement(rightValue)) {
      return false;
    }

    if (typeof leftValue === 'function' && typeof rightValue === 'function') {
      return true;
    }

    if (typeof leftValue === 'object' && typeof rightValue === 'object') {
      return compareObjects(leftValue, rightValue, maxDepth - 1);
    }

    return false;
  });

  return response;
}

window.compareObjects = compareObjects;
