export default async function subform() {
  const result = [
    {
      type: 'text',
      name: 'text2',
      label: 'Text',
      placeholder: 'ABCD',
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
      disabled: true,
    },
    {
      type: 'text',
      name: 'hex2',
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
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, 1000);
  });
}
