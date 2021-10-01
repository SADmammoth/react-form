import countries from './countries';
import imagebytes from './imagebytes';
import subform from './subform';

const inputs = [
  {
    type: 'text',
    name: 'text',
    label: 'Text',
    placeholder: 'ABCD',
    converters: {
      in: (e) => e?.text,
      out: (value) => {
        return { text: value };
      },
    },
    control: {
      field: 'subform',
      prop: 'hidden',
      map: (value) => {
        return value === 'hey';
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
    type: 'subform',
    name: 'subform',
    label: 'Subform',
    inputs: subform,
  },
  // {
  //   type: 'text',
  //   name: 'hex',
  //   label: 'Hex',
  //   converter: {
  //     in: (value) => {
  //       return value;
  //     },
  //     out: (value) => {
  //       let r = parseInt(value.slice(1, 3), 16);
  //       let g = parseInt(value.slice(3, 5), 16);
  //       let b = parseInt(value.slice(5, 7), 16);
  //       return `rgb(${r},${g},${b})`;
  //     },
  //   },
  //   value: '#ffffff',
  //   mask: '#\\hhhhhh',
  //   maskType: 'invisible',
  //   placeholder: '#ffffff',
  // },
  // {
  //   type: 'text',
  //   name: 'email',
  //   label: 'Email',
  //   validator: 'email',
  //   placeholder: 'text@example.com',
  // },
  // {
  //   type: 'text',
  //   name: 'phone',
  //   label: 'Phone mask',
  //   mask: '+999 (99) 999-99-99',
  //   placeholder: '+___ (__) ___-__-__',
  // },
  // {
  //   type: 'text',
  //   name: 'date',
  //   label: 'Date mask',
  //   converters: 'dateTime',
  //   mask: 'dateTimeInPastByCharWithInvisibleMask',
  //   value: new Date(),
  //   placeholder: 'dd-MM-yyyy',
  // },
  // {
  //   type: 'textarea',
  //   name: 'textarea',
  //   label: 'Textarea',
  //   minSymbols: 3,
  //   maxSymbols: 30,
  //   placeholder: 'Text (3-30 chars)',

  //   converters: {
  //     in: (e) => e?.text,
  //     out: (value) => {
  //       return { text: value };
  //     },
  //   },
  //   actionButton: {
  //     label: 'Clear',
  //     action: async (name, value) => {
  //       return '';
  //     },
  //   },
  // },
  // {
  //   type: 'number',
  //   name: 'number',
  //   label: 'Number',
  //   value: 1,

  //   min: 1,
  //   step: 2,
  //   max: 10,
  // },
  // {
  //   type: 'password',
  //   name: 'password',
  //   label: 'Password',
  //   placeholder: 'ABCD',
  // },
  // {
  //   type: 'radio',
  //   name: 'radio',
  //   label: 'Radio',
  //   group: {
  //     title: 'Checkbox variants',
  //     id: 'checkboxes',
  //   },
  //   value: 'AX',
  // },
  // {
  //   type: 'radio-group',
  //   name: 'radio-group',
  //   label: 'Radio countries',
  //   group: {
  //     title: 'Checkbox variants',
  //     id: 'checkboxes',
  //   },
  //   value: 'AX',
  //   valueOptions: () => countries().then((res) => res.slice(0, 3)),
  // },
  // {
  //   type: 'checkbox',
  //   name: 'checkbox',
  //   label: 'Checkbox',
  //   group: {
  //     title: 'Checkbox variants',
  //     id: 'checkboxes',
  //   },
  // },
  // {
  //   type: 'checkbox-group',
  //   name: 'checkbox-group',
  //   label: 'Checkbox countries',
  //   group: {
  //     title: 'Checkbox variants',
  //     id: 'checkboxes',
  //   },
  //   value: ['AX'],
  //   valueOptions: () => countries().then((res) => res.slice(0, 3)),
  // },
  // {
  //   type: 'toggle',
  //   name: 'toggle',
  //   label: 'Toggle',
  //   group: {
  //     title: 'Checkbox variants',
  //     id: 'checkboxes',
  //   },
  //   value: true,
  // },
  // {
  //   type: 'toggle-group',
  //   name: 'toggle-group',
  //   label: 'Toggle countries',
  //   group: {
  //     title: 'Checkbox variants',
  //     id: 'checkboxes',
  //   },
  //   value: ['AX'],
  //   valueOptions: () => countries().then((res) => res.slice(0, 3)),
  // },
  // {
  //   type: 'spoiler',
  //   name: 'spoiler',
  //   label: 'Spoiler countries',
  //   group: {
  //     title: 'Checkbox variants',
  //     id: 'checkboxes',
  //   },
  // },
  // {
  //   type: 'spoiler-group',
  //   name: 'spoiler-group',
  //   label: 'Spoiler countries',
  //   group: {
  //     title: 'Checkbox variants',
  //     id: 'checkboxes',
  //   },
  //   value: ['AX'],
  //   valueOptions: () => countries().then((res) => res.slice(0, 3)),
  // },
  // {
  //   type: 'select',
  //   name: 'select',
  //   label: 'Select country',
  //   placeholder: 'Country',
  //   valueOptions: () => countries().then((res) => res.slice(0, 3)),
  //   value: 'AX',
  //   control: [
  //     {
  //       group: 'checkboxes',
  //       prop: 'hidden',
  //       map: {
  //         ['AX']: false,
  //         ['*']: true,
  //       },
  //     },
  //     {
  //       field: 'text',
  //       prop: 'hidden',
  //       map: {
  //         ['AX']: false,
  //         ['*']: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   type: 'select-multiple',
  //   name: 'select-multiple',
  //   label: 'Select countries',
  //   placeholder: 'Country',
  //   valueOptions: () => countries().then((res) => res.slice(0, 3)),
  // },
  // {
  //   type: 'search',
  //   name: 'search',
  //   label: 'Search country',
  //   placeholder: 'Country',
  //   valueOptions: () => countries().then((res) => res.slice(0, 3)),
  //   value: 'AX',
  // },
  // {
  //   type: 'search-multiple',
  //   name: 'search-multiple',
  //   label: 'Search countries',
  //   placeholder: 'Country',
  //   valueOptions: () => countries().then((res) => res.slice(0, 3)),
  //   value: ['AX'],
  // },
  // {
  //   type: 'range',
  //   name: 'range',
  //   label: 'Price range',
  //   valueOptions: new Array(100)
  //     .fill(0)
  //     .map((_, i) => 10 * (i + 1))
  //     .map((x) => {
  //       return {
  //         label: '$' + x,
  //         value: x,
  //       };
  //     }),
  //   value: { from: 2, to: 91 },
  // },
  // {
  //   type: 'slider',
  //   name: 'slider',
  //   label: 'Alphabet',
  //   valueOptions: 'qwertyuiopasdfghjklzxcvbnm'
  //     .split('')
  //     .sort()
  //     .map((value) => {
  //       return {
  //         label: value,
  //         value,
  //       };
  //     }),
  // },
  // {
  //   type: 'file',
  //   name: 'file',
  //   label: 'File',
  //   value: new File(['foo'], 'foo.txt', {
  //     type: 'text/plain',
  //   }),
  // },
  // {
  //   type: 'file-multiple',
  //   name: 'file-multiple',
  //   label: 'Files',
  //   value: [
  //     new File(['foo'], 'foo.txt', {
  //       type: 'text/plain',
  //     }),
  //     new File(['foo'], 'foo.txt', {
  //       type: 'text/plain',
  //     }),
  //   ],
  // },
  // {
  //   type: 'image',
  //   name: 'image',
  //   label: 'Image',
  //   value: new File(
  //     [new Blob([imagebytes], { type: 'image/svg+xml' })],
  //     'foo.svg',
  //     {
  //       type: 'image/svg+xml',
  //     },
  //   ),
  // },
  // {
  //   type: 'image-multiple',
  //   name: 'image-multiple',
  //   label: 'Images',
  //   value: [
  //     new File([new Blob([imagebytes], { type: 'image/svg+xml' })], 'foo.svg', {
  //       type: 'image/svg+xml',
  //     }),
  //     new File([new Blob([imagebytes], { type: 'image/svg+xml' })], 'foo.svg', {
  //       type: 'image/svg+xml',
  //     }),
  //   ],
  // },
  // {
  //   type: 'markdown',
  //   name: 'markdown',
  //   label: 'Markdown (WIP)',
  //   hidden: true,
  // },
];

export default inputs;
