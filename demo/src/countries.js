export default async function countries() {
  const countries = await fetch('https://restcountries.com/v2/all').then(
    (res) => res.json(),
  );

  const result = countries.map(({ name, alpha2Code }) => {
    return { label: name, value: alpha2Code };
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, 1000);
  });
}
