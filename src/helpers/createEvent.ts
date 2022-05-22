export default function createEvent(name: string, value: any) {
  return { target: { name, value } };
}
