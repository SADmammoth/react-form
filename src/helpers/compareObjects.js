export default function compareObjects(leftObject, rightObject) {
  if (leftObject === rightObject) {
    return true;
  }
  if (typeof leftObject !== 'object' || typeof rightObject !== 'object') {
    return false;
  }
  Object.keys(leftObject).sort();
  Object.keys(rightObject).sort();
  return JSON.stringify(leftObject) === JSON.stringify(rightObject);
}
