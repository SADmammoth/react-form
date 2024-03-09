const ALPHABET = 'qwertyuiopasdfghjklzxcvbnm1234567890';

export function genrateRandomString(length: number = 10) {
  return Array(length)
    .fill(0)
    .map(() => ALPHABET[Math.floor(Math.random() * (ALPHABET.length - 1))])
    .join('');
}
