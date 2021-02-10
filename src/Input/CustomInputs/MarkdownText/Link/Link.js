import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import EditLink from './EditLink';

function Link({ setMd }) {
  let [link, setLink] = useState('');
  let [text, setText] = useState('');

  let [show, setShow] = useState(true);

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
          ></div>
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
          data-input="true"
        >
          {text}
        </a>
      )}
    </Fragment>
  );
}

Link.propTypes = {};

export default Link;
