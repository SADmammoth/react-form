import React, { useEffect, useState } from 'react';

import { isEmpty } from 'lodash-es';

import createEvent from '../helpers/createEvent';

export default function ActionButtonInput(actionButton, id, input) {
  if (!actionButton || isEmpty(actionButton)) return input;
  const [value, setValue] = useState(input.props.value);
  useEffect(() => {
    setValue(input.props.value);
  }, [input.props.value]);
  return (
    <div className="action-button-wrapper">
      {React.cloneElement(input, { ...input.props, value })}
      <button
        type="button"
        onClick={async () => {
          const { value, name, onBlur, onChange } = input.props;
          const newValue = await actionButton.action(name, value);
          setValue(newValue);
          onChange
            ? onChange(createEvent(name, newValue))
            : onBlur(createEvent(name, newValue));
        }}>
        {actionButton.label}
      </button>
    </div>
  );
}
