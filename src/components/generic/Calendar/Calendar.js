import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import renderTag from '@/helpers/renderTag';
import theme from '@/styles/theme';
import getDates from './getDates';
import styles from './Calendar.styles';

const useStyles = createUseStyles(styles);

function Calendar({ value }) {
  const classes = useStyles(theme);
  const [date, setDate] = useState(value);

  useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <div>
      <p>
        {date.toLocaleString(undefined, {
          month: 'long',
          year: 'numeric',
        })}
      </p>
      <button
        onClick={() => {
          setDate((curr) => {
            const newDate = new Date(curr);
            newDate.setFullYear(newDate.getFullYear() - 1);
            return newDate;
          });
        }}>
        &lt; &lt;
      </button>
      <button
        onClick={() => {
          setDate((curr) => {
            const newDate = new Date(curr);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
          });
        }}>
        &lt;
      </button>
      <button
        onClick={() => {
          setDate((curr) => {
            const newDate = new Date(curr);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
          });
        }}>
        &gt;
      </button>
      <button
        onClick={() => {
          setDate((curr) => {
            const newDate = new Date(curr);
            newDate.setFullYear(newDate.getFullYear() + 1);
            return newDate;
          });
        }}>
        &gt; &gt;
      </button>
      <div className={classes.calendarGrid}>
        {getDates(date).map((row) => (
          <div>
            {row.map((date) => {
              return (
                <div className={classes[date?.type]}>
                  {date?.date?.getDate()}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

Calendar.propTypes = {};

export default Calendar;
