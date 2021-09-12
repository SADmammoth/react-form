/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from 'react';

import classNames from 'classnames';
import { includes, isEqual } from 'lodash-es';
import { useTheme, createUseStyles } from 'react-jss';

import renderTag from '@/formHelpers/renderTag';
// import PropTypes from 'prop-types';
import theme from '@/styles/theme';

import styles from './Suggestions.styles';

const useStyles = createUseStyles(styles);

function Suggestions({
  className,
  inputClasses,
  allowScroll,
  showNumber,
  Input,
  name,
  filteredValueOptions,
  valueOptions,
  setCurrentLabel,
  onChange,
  currentValue,
  loading,
  placeholder,
  currentLabel,
  render,
  onBlur,
  hideListOnChoice = true,
}) {
  const classes = useStyles(theme);

  const input = useRef({});

  const [listShown, showList] = useState(false);

  const numberHiddenOption = allowScroll ||
    !filteredValueOptions ||
    filteredValueOptions.length <= showNumber || (
      <Option disabled name="" value="">
        {`${filteredValueOptions.length - 10} more`}
      </Option>
    );

  const Option = renderTag(render, 'Option');

  function renderOption(valueOption) {
    let isActive;
    isActive =
      (isEqual(currentValue, valueOption.value) ||
        includes(currentValue, valueOption.value)) &&
      !isActive;
    return (
      <Option
        name={name}
        key={name + valueOption.value}
        onClick={() => {
          if (isActive) {
            if (hideListOnChoice) {
              showList(false);
            }
            return;
          }

          setCurrentLabel(valueOption.label);
          onChange({ target: { name, value: valueOption.value } });
          if (hideListOnChoice) {
            showList(false);
          } else {
            showList(true);
          }
        }}
        active={isActive}
        {...valueOption}
      />
    );
  }

  return (
    <div
      className={classNames(className, classes.select, {
        [classes.placeholdered]: !currentValue,
      })}
      name={name}>
      <Input
        classes={inputClasses}
        name={name}
        ref={input}
        listShown={listShown}
        showList={showList}
        placeholder={placeholder}
        currentLabel={currentLabel}
        setCurrentLabel={setCurrentLabel}
        render={render}
        onBlur={onBlur}
        listShow={listShown}
        onChange={onChange}
        currentValue={currentValue}
        valueOptions={valueOptions}
      />

      {listShown && (
        <div
          className={classNames(classes.list, {
            [classes.scrollableList]: allowScroll,
          })}>
          {loading ? (
            <Option disabled name="" value="">
              {render.Loader ? render.Loader(14) : 'Loading...'}
            </Option>
          ) : (
            (allowScroll
              ? filteredValueOptions
              : filteredValueOptions.slice(0, showNumber)
            ).map((value) => renderOption(value))
          )}
          {numberHiddenOption}
        </div>
      )}
      {listShown ? (
        <div
          className={classes.backdrop}
          onClick={() => {
            showList(false);
          }}
        />
      ) : null}
    </div>
  );
}

Suggestions.propTypes = {};

export default Suggestions;
