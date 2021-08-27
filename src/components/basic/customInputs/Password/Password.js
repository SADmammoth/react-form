import React, { useCallback, useEffect, useRef, useState } from 'react';

import { times } from 'lodash-es';
import PropTypes from 'prop-types';

import createEvent from '@/formHelpers/createEvent';
import Button from '@/generic/Button';

function Password({ name, value, onChange, onInput, render, ...props }) {
  const hidePassword = (value) => {
    return times(value.length, () => render.passwordBullet || '\u2022').join(
      '',
    );
  };

  const [state, setState] = useState(value);

  const [showPassword, setShowPassword] = useState(false);

  const input = useRef({});

  useEffect(() => {
    input.current.value = hidePassword(value);
    setState(value);
  }, [value]);

  useEffect(() => {
    input.current.value = showPassword ? state : hidePassword(state);
  }, [showPassword, state]);

  const onChangeHandler = useCallback(
    (event) => {
      onChange(createEvent(name, state));
    },
    [state, name],
  );

  const onKeyDown = useCallback(
    (event) => {
      if (showPassword) return;
      if (
        event.key.length === 1 ||
        event.key === 'Backspace' ||
        event.key === 'Delete'
      ) {
        const pos = event.target.selectionStart;
        event.target.value = state;
        event.target.selectionEnd = pos;
      }
    },
    [state, showPassword],
  );

  const onInputHandler = useCallback(
    async (event) => {
      setState(event.target.value);
      onInput(createEvent(name, event.target.value));
    },
    [state, name],
  );

  const hideValue = useCallback(
    (event) => {
      if (showPassword) return;
      const pos = event.target.selectionStart;
      event.target.value = hidePassword(event.target.value);
      event.target.selectionEnd = pos;
    },
    [state, showPassword],
  );

  const onPaste = (event) => {
    let newText = (event.originalEvent || event).clipboardData.getData(
      'text/plain',
    );
    const pos = event.target.selectionStart;
    newText = newText.replace(/\r?\n/g, ' ');
    let el = event.target;
    let cursorPosStart = el.selectionStart;
    let cursorPosEnd = el.selectionEnd;
    let v = el.value;
    let textBefore = v.substring(0, cursorPosStart);
    let textAfter = v.substring(cursorPosEnd, v.length);
    let mergedText = textBefore + newText + textAfter;
    event.target.value = hidePassword(mergedText);
    setState(mergedText);
    onChange(createEvent(name, mergedText));

    event.target.selectionEnd = pos;

    event.preventDefault();
  };

  const onCopy = useCallback(
    (event) => event.clipboardData.setData('text', state),
    [state],
  );

  const InputTag = render.Input || 'input';
  const ButtonTag = render.Button || Button;

  return (
    <div className="action-button-wrapper">
      <InputTag
        className="password form-control"
        name={name}
        ref={input}
        type="text"
        value={showPassword ? state : hidePassword(state)}
        onBlur={onChangeHandler}
        onKeyDown={onKeyDown}
        onInput={onInputHandler}
        onChange={hideValue}
        autocomplete="off"
        onPaste={onPaste}
        onCopy={onCopy}
        onCut={onCopy}
        {...props}
      />

      <ButtonTag
        variant="showPassword"
        className="show_password-checkbox"
        onClick={() => setShowPassword((state) => !state)}>
        {showPassword ? 'hide' : 'show'}
      </ButtonTag>
    </div>
  );
}

Password.propTypes = {};

export default Password;
