import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import theme from '@/styles/theme';
import styles from './FieldGroup.styles';

const useStyles = createUseStyles(styles);

function FieldGroup({ name, title, children }) {
  const classes = useStyles(theme);

  return (
    <div id={`group-${name}`} className={classes.group}>
      <p className={classes.title}>{title}</p>
      {children}
    </div>
  );
}

FieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  title: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.any,
};

export default FieldGroup;
