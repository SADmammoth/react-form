import React from 'react';
import PropTypes from 'prop-types';
// import Form from '../../../../Form';
import Button from '../../Button';

function EditLink({ setData, close, textDefault, linkDefault }) {
  return (
    <div className="modal" data-input="true">
      <button
        className="close-icon"
        onClick={() => {
          close();
        }}
      >
        x
      </button>
      {/* <Form
        onSubmit={async ({ text, link }) => {
          setData(text, link);
          close();
        }}
        inputs={[
          {
            type: 'text',
            name: 'text',
            placeholder: 'Link text',
            label: 'Link text',
            required: true,
            value: textDefault,
          },
          {
            type: 'text',
            name: 'link',
            placeholder: 'Link path',
            label: 'Link text',
            required: true,
            value: linkDefault,
          },
        ]}
        submitButton={<button type="submit">Edit</button>}
      ></Form> */}
    </div>
  );
}

EditLink.propTypes = {
  setData: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default EditLink;
