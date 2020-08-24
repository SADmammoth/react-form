const tagManager = {
  open: function (
    value,
    html,
    name,
    tagName,
    markdownEquiv,
    selectedText,
    onChange
  ) {
    onChange(value + markdownEquiv);
    return `${html}<${tagName}>`;
  },
  close: function (
    value,
    html,
    name,
    tagName,
    markdownEquiv,
    selectedText,
    onChange
  ) {
    onChange(value + markdownEquiv);
    return `${html}</${tagName}>`;
  },
};

export default tagManager;
