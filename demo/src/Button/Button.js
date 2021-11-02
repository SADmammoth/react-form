import React from 'react';

function Button({ ...props }) {
  return <button type="button" data-custom="custom" {...props} />;
}

export default Button;
