export default function filterSearchOptions(search, options) {
  if (search && search.length >= 3) {
    const searchRegex = new RegExp(search, 'gi');

    return options
      .filter(({ label }) => !!label.match(searchRegex))
      .map((option) => {
        const { label } = option;
        const matches = label.split(searchRegex);
        const searchResults = label.match(searchRegex);
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
