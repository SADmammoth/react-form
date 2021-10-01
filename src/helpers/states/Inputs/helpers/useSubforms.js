import { useState } from 'react';
import safeUseEffect from '@/hooks/safeUseEffect';
import useSafeDiff from '../../../hooks/useSafeDiff';

function manageProps(props, input) {
  return Object.fromEntries(
    props.map((inputProps) => [
      inputProps.name,
      {
        ...inputProps,
        group: { title: input.label, id: `${input.name}sub`, subform: true },
      },
    ]),
  );
}

export default function useSubforms(state) {
  const [subforms, setSubforms] = useState([]);
  const [all, setAll] = useState(state);

  const addProp = (props) => setSubforms((state) => ({ ...state, ...props }));

  useSafeDiff(
    (isUnmounted, diff) => {
      if (diff && diff[0]) {
        setSubforms([]);
        Object.entries(all).forEach(([name, input]) => {
          addProp({ [name]: input });
          if (input.hidden === true) return;

          if (input.inputs && input.inputs instanceof Function) {
            input.inputs().then((props) => {
              if (!isUnmounted.value) {
                addProp(manageProps(props, input));
              }
            });
          } else if (input.inputs) {
            addProp(manageProps(input.inputs, input));
          }
        });
      }
    },
    [all],
  );

  const loadProps = (props) => {
    setAll(props);
  };

  return [subforms, loadProps];
}
