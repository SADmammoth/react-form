export default function createChildrenArray(root) {
  const children = [];

  function step(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      children.push(node);
    } else {
      node.childNodes.forEach((child) => step(child));
    }
  }

  step(root);

  return children;
}
