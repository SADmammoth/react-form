import { useEffect, useState } from 'react';

import safeUseEffect from '@/hooks/safeUseEffect';

export default function usePropsState(props) {
  // const [propsState, setPropsState] = useState([]);
  // const [allPropsState, setAllPropsState] = useState(props);

  // useEffect(() => {
  //   console.log(props);
  //   setAllPropsState([...props.filter(({ inputs }) => !inputs), ...propsState]);
  // }, [props, propsState]);

  // const addProp = (prop) =>
  //   setPropsState((state) => {
  //     return [...state, ...prop];
  //   });

  // safeUseEffect(
  //   (isUnmounted) => {
  //     setPropsState([]);
  //     props.forEach((input) => {
  //       if (input.hidden === true) return;

  //       if (input.inputs && input.inputs instanceof Function) {
  //         input.inputs().then((props) => {
  //           if (!isUnmounted.value) {
  //             addProp(
  //               props.map((inputProps) => ({
  //                 ...inputProps,
  //                 group: { title: input.label, id: input.name },
  //               })),
  //             );
  //           }
  //         });
  //       } else if (input.inputs) {
  //         addProp(
  //           input.inputs.map((inputProps) => ({
  //             ...inputProps,
  //             group: { title: input.label, id: input.name },
  //           })),
  //         );
  //       }
  //     });
  //   },
  //   [props],
  // );

  // return allPropsState;
  return props;
}
