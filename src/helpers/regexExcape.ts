const CHARACTERS_TO_ESCAPE = '\\[(.*$^&{+&?,\'"';

export function regexEscape(string: string) {
  return string
    .split('')
    .map((char) => (CHARACTERS_TO_ESCAPE.includes(char) ? '\\' + char : char))
    .join('');
}
