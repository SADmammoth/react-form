export default function getFileHash({
  name,
  size,
}: {
  name: string;
  size: number;
}): string {
  return name + size;
}
