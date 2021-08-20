import countries from './countries';

const inputs = [
  {
    type: 'text',
    id: 'text',
    name: 'text',
    label: 'Text',
    placeholder: 'ABCD',
  },
  {
    type: 'text',
    id: 'hex',
    name: 'hex',
    label: 'Hex',
    converter: {
      in: (value) => {
        return value;
      },
      out: (value) => {
        let r = parseInt(value.slice(1, 3), 16);
        let g = parseInt(value.slice(3, 5), 16);
        let b = parseInt(value.slice(5, 7), 16);
        return `rgb(${r},${g},${b})`;
      },
    },
    value: '#ffffff',
    mask: '#hhhhhh',
    maskType: 'invisible',
    placeholder: '#ffffff',
  },
  {
    type: 'text',
    id: 'email',
    name: 'email',
    label: 'Email',
    validator: 'email',
    placeholder: 'text@example.com',
  },
  {
    type: 'text',
    id: 'phone',
    name: 'phone',
    label: 'Phone mask',
    mask: '+999 (99) 999-99-99',
    placeholder: '+___ (__) ___-__-__',
  },
  {
    type: 'text',
    id: 'date',
    name: 'date',
    label: 'Date mask',
    converters: 'dateTime',
    mask: 'dateTimeInPastByCharWithInvisibleMask',
    value: new Date(),
    placeholder: 'dd-MM-yyyy',
  },
  {
    type: 'textarea',
    id: 'textarea',
    name: 'textarea',
    label: 'Textarea',
    minSymbols: 3,
    maxSymbols: 10,

    converters: {
      in: (e) => e?.text,
      out: (value) => {
        return { text: value };
      },
    },
    actionButton: {
      label: 'Clear',
      action: async (name, value) => {
        return '';
      },
    },
  },
  {
    type: 'number',
    id: 'number',
    name: 'number',
    label: 'Number',
    value: 1,

    min: 1,
    step: 2,
    max: 10,
  },
  {
    type: 'password',
    id: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'ABCD',
  },
  {
    type: 'radio',
    id: 'radio',
    name: 'radio',
    label: 'Radio countries',
    group: {
      title: 'Checkbox variants',
      id: 'checkboxes',
    },
    valueOptions: () => countries().then((res) => res.slice(0, 3)),
  },
  {
    type: 'checkbox',
    id: 'checkbox',
    name: 'checkbox',
    label: 'Checkbox countries',
    group: {
      title: 'Checkbox variants',
      id: 'checkboxes',
    },
    valueOptions: () => countries().then((res) => res.slice(0, 3)),
  },
  {
    type: 'toggle',
    id: 'toggle',
    name: 'toggle',
    label: 'Toggle countries',
    group: {
      title: 'Checkbox variants',
      id: 'checkboxes',
    },
    valueOptions: () => countries().then((res) => res.slice(0, 3)),
  },
  {
    type: 'spoiler',
    id: 'spoiler',
    name: 'spoiler',
    label: 'Spoiler countries',
    group: {
      title: 'Checkbox variants',
      id: 'checkboxes',
    },
    valueOptions: () => countries().then((res) => res.slice(0, 3)),
  },
  {
    type: 'select',
    id: 'select',
    name: 'select',
    label: 'Select country',
    placeholder: 'Country',
    valueOptions: () => countries().then((res) => res.slice(0, 3)),
  },
  {
    type: 'select-multiple',
    id: 'select-multiple',
    name: 'select-multiple',
    label: 'Select countries',
    placeholder: 'Country',
    valueOptions: () => countries().then((res) => res.slice(0, 3)),
  },
  {
    type: 'search',
    id: 'search',
    name: 'search',
    label: 'Search country',
    placeholder: 'Country',
    valueOptions: () => countries().then((res) => res.slice(0, 3)),
  },
  {
    type: 'search-multiple',
    id: 'search-multiple',
    name: 'search-multiple',
    label: 'Search countries',
    placeholder: 'Country',
    valueOptions: () => countries().then((res) => res.slice(0, 3)),
  },
  {
    type: 'range',
    id: 'range',
    name: 'range',
    label: 'Price range',
    valueOptions: new Array(100)
      .fill(0)
      .map((_, i) => 10 * (i + 1))
      .map((x) => {
        return {
          label: '$' + x,
          value: x,
        };
      }),
  },
  {
    type: 'slider',
    id: 'slider',
    name: 'slider',
    label: 'Alphabet',
    valueOptions: 'qwertyuiopasdfghjklzxcvbnm'
      .split('')
      .sort()
      .map((value) => {
        return {
          label: value,
          value,
        };
      }),
  },
  {
    type: 'file',
    id: 'file',
    name: 'file',
    label: 'File',
  },
  {
    type: 'file-multiple',
    id: 'file-multiple',
    name: 'file-multiple',
    label: 'Files',
  },
  {
    type: 'image',
    id: 'image',
    name: 'image',
    label: 'Image',
  },
  {
    type: 'image-multiple',
    id: 'image-multiple',
    name: 'image-multiple',
    label: 'Images',
  },
  {
    type: 'markdown',
    id: 'markdown',
    name: 'markdown',
    label: 'Markdown (WIP)',
  },
];

export default inputs;
