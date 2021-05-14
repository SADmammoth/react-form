export default function AddNotContains(regexp, notContains) {
  return RegExp(
    `${
      notContains.length
        ? `
          (?!(.*((${notContains.join(')|(')})).*))`
        : ''
    }${regexp}`,
  );
}
