import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import TriggerButton from './TriggerButton';

function Menu({ buttons, commonButtonMode }) {
  let renderButton = ({ key, mode, on, off, content }) => {
    let btnMode = mode || commonButtonMode;
    let NewButton = btnMode === 'trigger' ? TriggerButton : Button;
    return (
      <li key={key}>
        <NewButton type="button" on={on} off={off}>
          {content}
        </NewButton>
      </li>
    );
  };
  return <ul className="menu">{buttons.map(renderButton)}</ul>;
}

Menu.propTypes = {
  commonButtonMode: PropTypes.oneOf(['button', 'trigger']),
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      mode: PropTypes.oneOf(['button', 'trigger']),
      on: PropTypes.func.isRequired,
      off: PropTypes.func.isRequired,
      content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    })
  ).isRequired,
};

export default Menu;
