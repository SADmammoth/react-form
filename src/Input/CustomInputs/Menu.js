import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import TriggerButton from './TriggerButton';

function Menu({ buttons, commonButtonMode }) {
  let renderButton = (button) => {
    let { key, mode, content } = button;
    return (
      <li key={key}>
        {mode === 'trigger' ? (
          <TriggerButton type="button" on={button.on} off={button.off}>
            {content}
          </TriggerButton>
        ) : (
          <Button type="button" onClick={button.onClick}>
            {content}
          </Button>
        )}
      </li>
    );
  };
  return <ul className="menu">{buttons.map(renderButton)}</ul>;
}

Menu.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        mode: PropTypes.oneOf(['trigger']).isRequired,
        on: PropTypes.func.isRequired,
        off: PropTypes.func.isRequired,
        content: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
          .isRequired,
      }),
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        mode: PropTypes.oneOf(['button']).isRequired,
        onClick: PropTypes.func.isRequired,
        content: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
          .isRequired,
      }),
    ])
  ).isRequired,
};

export default Menu;