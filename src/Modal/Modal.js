import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

function Modal({ showDefault, replaceComponent, getCallbacks }) {
  let [show, setShow] = useState(showDefault);
  useEffect(() => {
    getCallbacks(setShow(true), setShow(false));
  }, [setShow]);

  return (
    <>
      {show ? (
        <div data-input="true">{children}</div>
      ) : (
        <>{replaceComponent || ''}</>
      )}
    </>
  );
}

Modal.propTypes = {};

export default Modal;
