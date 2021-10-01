import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import renderTag from '@/helpers/renderTag';
import theme from '@/styles/theme';
import Calendar from '../../../generic/Calendar';
import styles from './Date.styles';

const useStyles = createUseStyles(styles);

function Date({ value }) {
  const classes = useStyles(theme);

  return <Calendar value={value} />;
}

Date.propTypes = {};

export default Date;
