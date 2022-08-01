export default function formatFileSize(bytes: number): string {
  let size = bytes;
  if (size < 1024) {
    return `${size.toFixed(2)}B`;
  }
  size /= 1024;
  if (size < 1024) {
    return `${size.toFixed(2)}KB`;
  }
  size /= 1024;
  if (size < 1024) {
    return `${size.toFixed(2)}MB`;
  }
  size /= 1024;
  if (size < 1024) {
    return `${size.toFixed(2)}GB`;
  }
  return 'Infinity';
}
