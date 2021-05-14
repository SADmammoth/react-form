import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Button from './Button';

function TriggerButton({ children, init, on, off }) {
  const [state, setState] = useState(init);
  const trigger = () => {
    if (state) {
      off();
    } else {
      on();
    }
    setState(!state);
  };
  return (
    <Button type="button" onClick={trigger}>
      {children}
    </Button>
  );
}

TriggerButton.propTypes = {
  init: PropTypes.bool,
  on: PropTypes.func,
  off: PropTypes.func,
};

export default TriggerButton;
