export default function regexpEscape(str) {
  return str.replace(/[[\]\\^$.|?*+()]/g, '\\$&').replace(/\s/, '\\s');
}
