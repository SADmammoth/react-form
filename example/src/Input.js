import React from 'react';

import _ from 'lodash';

function Input(props) {
  if (props.type === 'textarea') {
    return <textarea data-custom='custom' {...props} />;
  } else {
    return <input data-custom='custom' {...props} />;
  }
}

export default React.memo(Input, _.isEqual);
