import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

function Modal({ showDefault, replaceComponent, getCallbacks }) {
  let [show, setShow] = useState(showDefault);
  useEffect(() => {
    getCallbacks(setShow(true), setShow(false));
  }, [setShow]);

  return (
    <Fragment>
      {show ? (
        <div data-input="true">{children}</div>
      ) : (
        <Fragment>{replaceComponent || ''}</Fragment>
      )}
    </Fragment>
  );
}

Modal.propTypes = {};

export default Modal;
