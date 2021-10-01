import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { times } from 'lodash-es';
import { createUseStyles } from 'react-jss';
import createEvent from '@/helpers/createEvent';
import renderTag from '@/helpers/renderTag';
import theme from '@/styles/theme';
import styles from './Password.styles';

const useStyles = createUseStyles(styles);

function Password({
  className,
  name,
  value,
  onChange,
  onInput,
  render,
  disabled,
  ...props
}) {
  const classes = useStyles(theme);

  const hidePassword = (value) =>
    times(value.length, () => render.passwordBullet || '\u2022').join('');

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

  const onChangeHandler = useCallback(() => {
    onChange(createEvent(name, state));
  }, [state, name]);

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
    const el = event.target;
    const cursorPosStart = event.target.selectionStart;
    const cursorPosEnd = event.target.selectionEnd;
    const v = el.value;
    const textBefore = v.substring(0, cursorPosStart);
    const textAfter = v.substring(cursorPosEnd, v.length);
    const mergedText = textBefore + newText + textAfter;
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

  const Input = renderTag(render, 'Input');
  const Button = renderTag(render, 'Button');

  return (
    <div className={classNames(className, classes.actionButtonWrapper)}>
      <Input
        className={classNames(classes.password, {
          [classes.disabled]: disabled,
        })}
        name={name}
        ref={input}
        type="text"
        value={showPassword ? state : hidePassword(state)}
        onBlur={onChangeHandler}
        onKeyDown={onKeyDown}
        onInput={onInputHandler}
        onChange={hideValue}
        autoComplete="off"
        onPaste={onPaste}
        onCopy={onCopy}
        onCut={onCut}
        disabled={disabled}
        {...props}
      />

      <Button
        variant={showPassword ? 'hidePassword' : 'showPassword'}
        className={classes.passwordButton}
        onClick={() => {
          setShowPassword((state) => !state);
          input.current.focus();
        }}
        disabled={disabled}>
        {showPassword ? 'hide' : 'show'}
      </Button>
    </div>
  );
}

Password.propTypes = {};

export default Password;
