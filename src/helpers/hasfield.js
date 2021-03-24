export default function hasfield(obj) {
  return (object) => {
    return Object.entries(obj).every(([key, value]) => object[key] === value);
  };
}
