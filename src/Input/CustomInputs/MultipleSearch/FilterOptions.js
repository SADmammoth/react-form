import getGroupsIndices from '../../../helpers/getGroupsIndices';

export default function FilterOptions(search, options) {
  if (search && search !== '') {
    const searchRegex = new RegExp(search, 'gi');

    return options
      .filter(({ label }) => {
        return !!label.match(searchRegex);
      })
      .map((option) => {
        const { label } = option;
        const matches = label.split(searchRegex);
        const searchResults = label.match(searchRegex);
        const groups = matches
          .map((item, i) => {
            return [item, searchResults[i]];
          })
          .flat();

        return {
          ...option,
          groups,
        };
      });
  }

  return options;
}
