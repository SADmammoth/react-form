import DateMask from './DateMask';
import { months, monthsShort } from './helpers/months';
import regexpEscape from './helpers/regexpEscape';

function hours12(hours) {
  return hours > 12 ? hours - 12 : hours;
}

const DateMaskConverters = {
  // Parsing from date string to Date by mask
  parseDateByMask: (input, mask) => {
    if (!input || typeof input !== 'string') {
      return input;
    }
    const Regexp = new RegExp(DateMask.dateTimeRegexpString([mask]));
    const matchedInput = Regexp.exec(input)?.groups;

    if (!matchedInput) {
      return input;
    }

    let monthNum = parseInt(matchedInput.monthNumber, 10) - 1;

    if (matchedInput.monthShort) {
      monthNum = monthsShort.indexOf(matchedInput.monthShort);
    }

    if (matchedInput.monthFull) {
      monthNum = months.indexOf(matchedInput.monthFull);
    }

    let hourNum = parseInt(matchedInput.hours, 10);

    if (matchedInput.hours12) {
      if (matchedInput.ampm && matchedInput.ampm.match(/PM/i)) {
        hourNum = parseInt(matchedInput.hours12, 10) + 12;
      } else {
        hourNum = parseInt(matchedInput.hours12, 10);
      }
    }

    let yearNum = parseInt(matchedInput.year, 10);
    if (yearNum < 100) {
      yearNum = 2000 + yearNum;
    }

    const date = [
      yearNum || 1990,
      monthNum || 1,
      parseInt(matchedInput.day, 10) || 1,
      hourNum || 0,
      parseInt(matchedInput.minutes, 10) || 0,
      parseInt(matchedInput.seconds, 10) || 0,
    ].filter((el) => el);

    return new Date(...date);
  },

  // Stringifies given date according mask
  fromDateToMask: (date, mask) => {
    if (!(date instanceof Date)) {
      return date;
    }
    return regexpEscape(mask)
      .replace(/(^|[^M])M($|[^M])/g, `$1${date.getMonth() + 1}$2`)
      .replace(
        /(^|[^M])MM($|[^M])/g,
        `$1${
          date.getMonth() + 1 < 9
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1
        }$2`,
      )
      .replace(/(^|[^M])MMM($|[^M])/g, `$1${monthsShort[date.getMonth()]}$2`)
      .replace(/(^|[^M])MMMM($|[^M])/g, `$1${months[date.getMonth()]}$2`)
      .replace(/(^|[^d])d($|[^d])/g, `$1${date.getDate()}$2`)
      .replace(
        /(^|[^d])dd($|[^d])/g,
        `$1${date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()}$2`,
      )
      .replace(/(^|[^y])yy($|[^y])/g, `$1${date.getFullYear() % 100}$2`)
      .replace(/(^|[^y])yyyy($|[^y])/g, `$1${date.getFullYear()}$2`)
      .replace(/(^|[^m])m($|[^m])/g, `$1${date.getMinutes()}$2`)
      .replace(
        /(^|[^m])mm($|[^m])/g,
        `$1${
          date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
        }$2`,
      )
      .replace(/(^|[^s])s($|[^s])/g, `$1${date.getSeconds()}$2`)
      .replace(
        /(^|[^s])ss($|[^s])/g,
        `$1${
          date.getSeconds() <= 9 ? `0${date.getSeconds()}` : date.getSeconds()
        }$2`,
      )
      .replace(/(^|[^h])h($|[^h])/g, `$1${hours12(date.getHours())}$2`)
      .replace(
        /(^|[^h])hh($|[^h])/g,
        `$1${
          hours12(date.getHours()) < 9
            ? `0${hours12(date.getHours())}`
            : hours12(date.getHours())
        }$2`,
      )
      .replace(/(^|[^H])H($|[^H])/g, `$1${date.getHours()}$2`)
      .replace(
        /(^|[^H])HH($|[^H])/g,
        `$1${date.getHours() < 9 ? `0${date.getHours()}` : date.getHours()}$2`,
      )
      .replace(/(^|[^a])a($|[^a])/g, `$1${date.getHours > 12 ? 'PM' : 'AM'}$2`);
  },
};

export default DateMaskConverters;
