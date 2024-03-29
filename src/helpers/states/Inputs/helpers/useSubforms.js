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
          addProp({
            [name]: input,
          });
          if (input.hidden === true) return;

          if (input.inputs && input.inputs instanceof Function) {
            addProp({
              [name]: {
                ...input,
                group: {
                  title: input.label,
                  id: `${input.name}sub`,
                  subform: true,
                },
              },
            });
            input.inputs().then((props) => {
              if (!isUnmounted.value) {
                addProp({
                  [name]: {
                    ...input,
                    loaded: true,
                  },
                });
                addProp(manageProps(props, input));
              }
            });
            return;
          }
          if (input.inputs) {
            addProp({
              [name]: {
                ...input,
                group: {
                  title: input.label,
                  id: `${input.name}sub`,
                  subform: true,
                },
              },
            });
            addProp(manageProps(input.inputs, input));
            return;
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
