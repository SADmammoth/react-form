import { useEffect, useState } from 'react';

import safeUseEffect from '@/hooks/safeUseEffect';

export default function usePropsState(props) {
  const [propsState, setPropsState] = useState([]);
  const [allPropsState, setAllPropsState] = useState(props);

  useEffect(() => {
    setAllPropsState([...props, ...propsState]);
  }, [props, propsState]);

  const addProp = (prop) =>
    setPropsState((state) => {
      return [...state, ...prop];
    });

  const [shouldUpdate, setUpdate] = useState(false);

  const update = () => {
    setUpdate(true);
  };

  safeUseEffect(
    (isUnmounted) => {
      setPropsState([]);
      props.forEach((input) => {
        if (input.hidden === true) return;

        if (input.inputs && input.inputs instanceof Function) {
          input.inputs().then((props) => {
            if (!isUnmounted.value) {
              addProp(
                props.map((inputProps) => ({
                  ...inputProps,
                  group: { title: input.label, id: input.name },
                })),
              );
            }
          });
        } else if (input.inputs) {
          addProp(
            input.inputs.map((inputProps) => ({
              ...inputProps,
              group: { title: input.label, id: input.name },
            })),
          );
        }
      });

      setUpdate(false);
    },
    [props, shouldUpdate],
  );

  const unload = (inputName) => {
    console.log(inputName);
    setPropsState((propsState) => {
      return propsState.filter(({ name }) => name !== inputName);
    });
  };

  return [allPropsState, unload, update];
}
