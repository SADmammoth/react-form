export default function getFileHash({ name, size }) {
  return name + size;
}
