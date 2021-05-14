import React from 'react';

import Link from '../Link/Link';

export default function createLink(
  htmlDispatch,
  htmlI,
  mdDispatch,
  actionTypes,
  portals,
  setPortals,
) {
  htmlDispatch({
    type: actionTypes.input,
    data: `<div id='link-${htmlI}' data-input="true"></div>`,
  });

  setPortals({
    ...portals,
    [`link-${htmlI}`]: (
      <Link
        setMd={(md) => {
          mdDispatch({
            type: actionTypes.input,
            data: md,
          });
        }}
      />
    ),
  });
}
