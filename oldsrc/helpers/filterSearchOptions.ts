import { ValueOptions } from './types/basic';

export default function filterSearchOptions(
  search: string,
  options: ValueOptions,
) {
  if (search && search.length >= 3) {
    const searchRegex = new RegExp(search, 'gi');

    return options
      .filter(({ label }) => !!label.match(searchRegex))
      .map((option) => {
        const { label } = option;
        const matches = label.split(searchRegex);
        const searchResults = label.match(searchRegex);
        if (!searchResults) return;
        const groups = matches
          .map((item, i) => [item, searchResults[i]])
          .flat();

        return {
          ...option,
          groups,
        };
      });
  }

  return options;
}
