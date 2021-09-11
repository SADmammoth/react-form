/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import classNames from 'classnames';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import styles from './Option.styles';

const useStyles = createUseStyles(styles);

function Option({ active, disabled, label, children, groups, onClick }) {
  const classes = useStyles();

  let toShow = label;
  if (groups) {
    toShow = groups.map((group, i) => {
      if (!group) return group;
      return i % 2 ? (
        <pre className={classes.searchResult}>{group}</pre>
      ) : (
        <pre>{group}</pre>
      );
    });
  }

  return (
    <pre
      className={classNames(classes.option, {
        [classes.active]: active && !disabled,
        // [classes.option]: active,
        [classes.disabled]: disabled,
      })}
      onClick={onClick}>
      {children || toShow}
    </pre>
  );
}

Option.propTypes = {};

export default Option;
