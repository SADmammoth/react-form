const tagManager = {
  open(
    value,
    html,
    name,
    tagName,
    markdownEquiv,
    selectedText,
    onChange = () => {},
  ) {
    onChange(value + markdownEquiv);
    return `${html}<${tagName}>`;
  },
  close(
    value,
    html,
    name,
    tagName,
    markdownEquiv,
    selectedText,
    onChange = () => {},
  ) {
    onChange(value + markdownEquiv);
    return `${html}</${tagName}>`;
  },
};

export default tagManager;
