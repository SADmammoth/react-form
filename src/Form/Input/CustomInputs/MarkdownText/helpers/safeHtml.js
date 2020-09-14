export default function safeHtml(text) {
  return text.replace(
    /(<([a-z0-9A-Z]+)[\s]*([^<>]*)[\s]*>(?=(.*)<\/\1>))|(<([a-z0-9A-Z]+)[\s]*([^<>]*)[\s]*>)/gm,
    ''
  );
}
