import regexpEscape from './regexpEscape';
import toArray from '../helpers/toArray';
import { months, monthsShort } from './months';

const DateMask = {
  /* *
   * Mask template:
   *
   * M    - month number
   * MM   - month number with trailing 0
   * MMM  - month in word (short)
   * MMMM - month in word
   * d    - day number
   * dd   - day number with trailing 0
   * yy   - year number (short)
   * yyyy - year number
   * m    - minutes
   * mm   - minutes with trailing 0
   * s    - seconds
   * ss   - seconds with trailing 0
   * h    - hours (12h-format)
   * hh   - hours with trailing 0 (12h-format)
   * H    - hours (24h-format)
   * HH   - hours with trailing 0 (24h-format)
   * a    - AM / PM mark
   */

  dateTimeMessage: 'Invalid date format',
  dateTimeInPastMessage: 'Invalid past date format',

  // Constructs regexp from mask
  // Regexp contains groups, representing month number, day number and so on
  dateTimeRegexpString: (masks) => {
    if (Object.keys(DateMask.dateTimeLastMasks).length >= 10) {
      DateMask.dateTimeLastMasks = {};
    }

    let Regexp;
    if (!DateMask.dateTimeLastMasks[masks.join(';')]) {
      Regexp = `(^${masks
        .map((mask) => {
          return regexpEscape(mask)
            .replace(/(^|[^M\\])M($|[^M])/g, '$1(?<_0>[1-9]|1[0-2])$2')
            .replace(/(^|[^M\\])MM($|[^M])/g, '$1(?<_0>0[1-9]|1[0-2])$2')

            .replace(
              /(^|[^M\\])MMM($|[^M])/g,
              `$1(?<_1>${monthsShort.join(')|(')})$2`
            )

            .replace(
              /(^|[^M\\])MMMM($|[^M])/g,
              `$1(?<_2>${months.join(')|(')})$2`
            )

            .replace(/(^|[^d\\])d($|[^d])/g, '$1(?<_3>[1-9]|[12][0-9]|3[01])$2')
            .replace(
              /(^|[^d\\])dd($|[^d])/g,
              '$1(?<_3>0[1-9]|[12][0-9]|3[01])$2'
            )

            .replace(/(^|[^y\\])yy($|[^y])/g, '$1(?<_4>[1-9][0-9])$2')
            .replace(/(^|[^y\\])yyyy($|[^y])/g, '$1(?<_4>[1-2][90][0-9]{2})$2')

            .replace(/(^|[^h\\])h($|[^h])/g, '$1(?<_5>[0-9]|1[0-2])$2')
            .replace(/(^|[^h\\])hh($|[^h])/g, '$1(?<_5>0[0-9]|1[0-2])$2')

            .replace(/(^|[^H\\])H($|[^H])/g, '$1(?<_6>[0-9]|1[0-9]|2[0-3])$2')
            .replace(/(^|[^H\\])HH($|[^H])/g, '$1(?<_6>0[0-9]|1[0-9]|2[0-3])$2')

            .replace(/(^|[^m\\])m($|[^m])/g, '$1(?<_7>0|[1-5][0-9])$2')
            .replace(/(^|[^m\\])mm($|[^m])/g, '$1(?<_7>[0-5][0-9])$2')

            .replace(/(^|[^s\\])s($|[^s])/g, '$1(?<_8>0|[1-5][0-9])$2')
            .replace(/(^|[^s\\])ss($|[^s])/g, '$1(?<_8>[0-5][0-9])$2')

            .replace(/(^|[^a\\])a($|[^a])/g, '$1(?<_9>AM|PM)$2')

            .replace('<_0>', '<monthNumber>')
            .replace('<_1>', '<monthShort>')
            .replace('<_2>', '<monthFull>')
            .replace('<_3>', '<day>')
            .replace('<_4>', '<year>')
            .replace('<_5>', '<hours12>')
            .replace('<_6>', '<hours>')
            .replace('<_7>', '<minutes>')
            .replace('<_8>', '<seconds>')
            .replace('<_9>', '<ampm>');
        })
        .join('$)|(^')}$)`; // concat with OR statement for every date mask}

      DateMask.dateTimeLastMasks[masks.join(';')] = Regexp;
    } else {
      Regexp = DateMask.dateTimeLastMasks[masks.join(';')];
    }
    return Regexp;
  },

  // Checks if date string follows mask
  dateTime: (dateString, masks = ['MM-dd-yyyy hh:mm:ss']) => {
    const dateTimeRegex = new RegExp(DateMask.dateTimeRegexpString(masks));
    return dateTimeRegex.test(dateString);
  },

  dateTimeLastMasks: {},

  // Checks is date valid using Date constructor
  dateTimeJS: (date) => {
    try {
      Date(date);
    } catch (error) {
      return false;
    }
    return true;
  },

  // Checks if date string follows mask and represents date in past
  dateTimeInPast: (input, mask = 'MM-dd-yyyy hh:mm:ss') => {
    if (!DateMask.dateTime(input, [mask])) {
      return false;
    }
    const date = DateMask.parseDateByMask(input, mask);
    return date < new Date();
  },

  // Checks if current date input follows the mask
  dateByChar: (input, masks = ['MM-dd-yyyy hh:mm:ss']) => {
    const Regexp = RegExp(
      `(^${masks
        .map((mask) => {
          const check =
            toArray(mask.slice(input.length - 1)).findIndex((el) =>
              /[^MdymshHa]/.test(el)
            ) +
            input.length -
            1;
          const maskU = regexpEscape(mask);

          if (check > input.length) {
            return `(.{${input.length - 1}})[0-9]`;
          }
          if (check === input.length - 1) {
            if (maskU[check] === '\\' && maskU[check - 1] !== '\\') {
              return DateMask.dateTimeRegexpString([maskU.slice(0, check + 2)]);
            }
            return DateMask.dateTimeRegexpString([maskU.slice(0, check + 1)]);
          }
          if (input.length - check >= 2) {
            if (input.length >= mask.length) {
              return DateMask.dateTimeRegexpString([maskU]);
            }
            return `(.{${input.length - 1}})[0-9]`;
          }
          return DateMask.dateTimeRegexpString([maskU.slice(0, check)]).replace(
            /[$^]/g,
            ''
          );
        })
        .join('$)|(^')}$)`
    );

    return Regexp.test(input);
  },
};

export default DateMask;
