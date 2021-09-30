export default function manageSubforms(props, addInputsCallback) {
  let propsEntries = Object.entries({ ...props });

  for (let i = 0; i < propsEntries.length; i++) {
    const [name, input] = propsEntries[i];
    if (input.type === 'subform' && !input.hidden) {
      propsEntries.push(
        ...input.inputs.map((props) => [
          props.name,
          {
            ...props,
            group: { id: name + 'subform', title: input.label },
          },
        ]),
      );
    }
    propsEntries[i] = [name, input];
  }

  console.log(propsEntries);
  return Object.fromEntries(propsEntries.filter((a) => a));
}
