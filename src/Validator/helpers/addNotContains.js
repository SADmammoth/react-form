export default function addNotContains(regexp, notContains) {
  return RegExp(
    `${
      notContains.length
        ? `
          (?!(.*((${notContains.join(')|(')})).*))`
        : ''
    }${regexp}`,
  );
}
