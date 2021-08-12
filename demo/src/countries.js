export default async function countries() {
  const countries = await fetch(
    'https://restcountries.eu/rest/v2/all'
  ).then((res) => res.json());
  return countries.map(({ name, alpha2Code }) => {
    return { label: name, value: alpha2Code };
  });
}
