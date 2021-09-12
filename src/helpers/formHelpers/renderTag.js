import Button from '@/generic/Button';
import SearchOption from '@/generic/SearchOption';
import Tag from '@/generic/Tag';

const defaultTags = {
  Button,
  Input: 'input',
  Group: 'div',
  Label: 'label',
  Tag,
  TextArea: 'textarea',
  Option: SearchOption,
  Form: 'form',
};

const toRenderKey = (key) => {
  return key === 'TextArea' ? 'Input' : key;
};

export default function renderTag(render, key) {
  if (render[toRenderKey(key)]) {
    return render[toRenderKey(key)];
  }

  return defaultTags[key];
}
