//@ts-ignore
import SearchOption from '@/generic/SearchOption';
import { RenderElementsProp } from './types/basic';

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

type Key = keyof typeof defaultTags;

const toRenderKey = (key: Key) =>
  (key === 'TextArea' ? 'Input' : key) as keyof RenderElementsProp;

export default function renderTag(render: RenderElementsProp, key: Key) {
  if (render[toRenderKey(key)]) {
    return render[toRenderKey(key)];
  }

  return defaultTags[key];
}
