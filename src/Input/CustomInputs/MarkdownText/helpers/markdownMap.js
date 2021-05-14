import createLink from './createLink';

const markdownMap = {
  Bold: ['b', '**', '**'],
  Italic: ['i', '_', '_'],
  H1: ['h1', '#', '  '],
  H2: ['h2', '##', '  '],
  H3: ['h3', '###', '  '],
  H4: ['h4', '####', '  '],
  NewLine: ['br', '  '],
};

function specialButtons(
  htmlDispatch,
  htmlI,
  mdDispatch,
  actionTypes,
  portals,
  setPortals,
) {
  return {
    Link: () =>
      createLink(
        htmlDispatch,
        htmlI,
        mdDispatch,
        actionTypes,
        portals,
        setPortals,
      ),
  };
}

export default markdownMap;
export { specialButtons };
