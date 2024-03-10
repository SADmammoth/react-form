import { regexEscape } from '../../../helpers/regexExcape';

export function removeCommandFromString(
  string: string,
  command: string,
  backtrackOverflow?: string,
) {
  return string.replace(
    new RegExp(`${regexEscape(command)}${backtrackOverflow ?? ''}$`),
    '',
  );
}
