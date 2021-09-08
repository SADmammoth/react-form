import React from 'react';

import { isEqual } from 'lodash-es';

const Input = React.forwardRef((props, ref) => {
  if (props.type === 'textarea') {
    return <textarea ref={ref} data-custom="custom" {...props} />;
  } else {
    return <input ref={ref} data-custom="custom" {...props} />;
  }
});

export default React.memo(Input, isEqual);
