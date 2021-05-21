import React from 'react';

import PropTypes from 'prop-types';

import createEvent from '../../../helpers/createEvent';

function Image({ accept, render, value, onChange, name }) {
  const InputTag = render.Input || 'input';
  return (
    <React.Fragment>
      <InputTag
        type="file"
        name={name}
        files={value}
        accept={accept}
        onChange={(event) => {
          const url = URL.createObjectURL(event.target.files[0]);
          //   CONSOLE.LOG(EVENT.TARGET.FILES[0]);
          onChange(
            createEvent(name, {
              url,
              fileName: event.target.files[0].name,
              fileSize: event.target.files[0].size,
            }),
          );
        }}
      />
    </React.Fragment>
  );
}

Image.propTypes = {};

export default Image;
