import React, { useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { times } from 'lodash-es';
import PropTypes from 'prop-types';
import { useTheme, createUseStyles } from 'react-jss';

import createEvent from '@/formHelpers/createEvent';
import Button from '@/generic/Button';
import theme from '@/styles/theme';

import styles from './Password.styles';

const useStyles = createUseStyles(styles);

function Password({ name, value, onChange, onInput, render, ...props }) {
  const classes = useStyles(theme);

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
    let cursorPosStart = event.target.selectionStart;
    let cursorPosEnd = event.target.selectionEnd;
    console.log(cursorPosStart, cursorPosEnd);
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
    (event) => {
      event.clipboardData.setData('text/plain', state);
      hideValue(event);
      event.preventDefault();
    },
    [state],
  );

  const onCut = useCallback(
    (event) => {
      event.clipboardData.setData('text/plain', state);
      setState('');
      onInput(createEvent(name, ''));
      event.preventDefault();
    },
    [state],
  );

  const InputTag = render.Input || 'input';
  const ButtonTag = render.Button || Button;

  return (
    <div className={classes.actionButtonWrapper}>
      <InputTag
        className={classes.password}
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
        onCut={onCut}
        {...props}
      />

      <ButtonTag
        variant={showPassword ? 'hidePassword' : 'showPassword'}
        className={classes.passwordButton}
        onClick={() => {
          setShowPassword((state) => !state);
          input.current.focus();
        }}>
        {showPassword ? 'hide' : 'show'}
      </ButtonTag>
    </div>
  );
}

Password.propTypes = {};

export default Password;
