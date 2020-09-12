import markdownMap from './markdownMap';

export default function createMdShortcutsButtons(
  htmlDispatch,
  mdDispatch,
  actionTypes,
  onInput,
  specialButtons
) {
  return [
    ...Object.entries(markdownMap).map(([btnName, [tag, md, mdClose]]) => ({
      mode: 'trigger',
      key: btnName,
      content: btnName,
      on: () => {
        let { endOffset, startOffset } = window.getSelection().getRangeAt(0);
        if (endOffset === startOffset) {
          htmlDispatch({ type: actionTypes.input, data: md });
          mdDispatch({ type: actionTypes.input, data: md });
        } else {
          htmlDispatch({
            type: actionTypes.wrap,
            data: {
              from: startOffset,
              to: endOffset,
              leftWrap: `<${tag}>`,
              rightWrap: `</${tag}>`,
            },
          });
          mdDispatch({
            type: actionTypes.wrap,
            data: {
              from: startOffset,
              to: endOffset,
              leftWrap: md,
              rightWrap: mdClose,
            },
          });
        }

        onInput();
      },
      off: () => {
        htmlDispatch({ type: actionTypes.input, data: mdClose });
        mdDispatch({ type: actionTypes.input, data: mdClose });
        onInput();
      },
    })),
    ...Object.entries(specialButtons).map(([btnName, onClick]) => ({
      mode: 'button',
      key: btnName,
      content: btnName,
      onClick,
    })),
  ];
}
