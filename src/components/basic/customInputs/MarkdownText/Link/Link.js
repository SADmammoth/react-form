import React, { Fragment, useState } from 'react';

// import PropTypes from 'prop-types';
import EditLink from './EditLink';

function Link({ setMd }) {
  const [link, setLink] = useState('');
  const [text, setText] = useState('');

  const [show, setShow] = useState(true);

  return (
    <Fragment>
      {show ? (
        <Fragment>
          <EditLink
            setData={(text, link) => {
              setText(text);
              setLink(link);
              setMd(`[${text}](${link})`);
            }}
            close={() => setShow(false)}
          />
          <div
            data-input="true"
            className="modal-backdrop"
            onClick={() => {
              setShow(false);
            }}
          />
        </Fragment>
      ) : (
        <a
          href={link}
          title="Ctrl + Click to follow the link"
          onClick={(event) => {
            if (!window.event.ctrlKey) {
              event.preventDefault();
              setShow(true);
            } else {
              document.location.href = link;
            }
          }}
          data-input="true">
          {text}
        </a>
      )}
    </Fragment>
  );
}

Link.propTypes = {};

export default Link;
