export default function safeHtml(text) {
  return text.replace(
    /(<([a-z0-9A-Z]+)[\s]*([^<Fragment>]*)[\s]*>(?=(.*)<\/\1>))|(<([a-z0-9A-Z]+)[\s]*([^<Fragment>]*)[\s]*>)/gm,
    '',
  );
}
