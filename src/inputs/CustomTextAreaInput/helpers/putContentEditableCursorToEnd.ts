export function putContentEditableCursorToEnd(target: HTMLElement) {
  let range = document.createRange();
  range.selectNodeContents(target);
  range.collapse(false);
  let selection = window.getSelection();
  if (!selection) return;
  selection.removeAllRanges();
  selection.addRange(range);
}
