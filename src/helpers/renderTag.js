import SearchOption from '@/generic/SearchOption';

const defaultTags = {
  Button: 'button',
  Input: 'input',
  Group: 'div',
  Label: 'label',
  Tag: 'div',
  TextArea: 'textarea',
  Option: SearchOption,
  Form: 'form',
};

const toRenderKey = (key) => (key === 'TextArea' ? 'Input' : key);

export default function renderTag(render, key) {
  if (render[toRenderKey(key)]) {
    return render[toRenderKey(key)];
  }

  return defaultTags[key];
}
