import countriesData from './countriesStatic.json';

export async function countries() {
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

export function countriesStatic() {
  return countriesData.map(({ name, alpha2Code }) => {
    return { label: name, value: alpha2Code };
  });
}

export function countriesNamesStatic() {
  return countriesData.map(({ name, alpha2Code }) => {
    return { label: name, value: alpha2Code };
  });
}
