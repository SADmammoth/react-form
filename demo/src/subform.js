export default function subform() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
        },
        {
          type: 'password',
          name: 'text3',
          label: 'Text',
          placeholder: 'ABCD',
        },
      ]);
    }, 1000);
  });
}
