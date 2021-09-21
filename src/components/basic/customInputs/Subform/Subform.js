import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import Input from '../../Input';

const Subform = ({ name, group, inputs, addInputs }) => {
  useEffect(() => {
    addInputs(inputs.map((input) => ({ ...input, group })));
  }, [inputs, addInputs.state]);
  return 'Subform';
};

Subform.propTypes = {
  name: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
  }),
  inputs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object, PropTypes.func),
  ]),
  onChange: PropTypes.func,
};

export default Subform;
