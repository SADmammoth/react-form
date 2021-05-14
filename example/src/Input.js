import React from 'react';

import {isEqual} from 'lodash-es';

function Input(props) {
  if (props.type === 'textarea') {
    return <textarea data-custom='custom' {...props} />;
  } else {
    return <input data-custom='custom' {...props} />;
  }
}

export default React.memo(Input, isEqual);
