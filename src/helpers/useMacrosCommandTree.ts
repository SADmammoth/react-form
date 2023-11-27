import { useCallback, useMemo, useState } from 'react';
import { uniqueId } from 'lodash';
import { ReactNodeLike } from 'prop-types';
import { MacrosCollection } from '../types/InputsProps/inputTypes/ICustomTextAreaInputProps';

export type MacrosContextValue = (ReactNodeLike | MacrosContextPointer)[];

export type MacrosContextPointer = {
  id: string;
};
const getPointerValue = (
  pointer: MacrosContextPointer | null,
  contexts: MacrosContext[],
) => {
  if (!pointer) {
    return null;
  }
  return contexts.find(({ id }) => pointer.id === id);
};

export class MacrosContext {
  id!: string;
  macrosCommandKey: string | null = null;
  value: MacrosContextValue = [];
  parent: MacrosContextPointer | null = null;
  indexOffset: number = 0;

  constructor(
    id: string,
    macrosCommandKey: string | null = null,
    value: MacrosContextValue = [],
    parent: MacrosContext | null = null,
  ) {
    this.id = id;
    this.macrosCommandKey = macrosCommandKey;
    this.value = value;
    this.parent = parent;
  }
}

export type UseMacrosCommandTreeReturnType = {
  reactNode: ReactNodeLike;
  enterNextSiblingContext: () => void;
  enterPrevSiblingContext: () => void;
  exitContext: () => void;
  createNewContext: (macrosCommandKey: string, index: number) => void;
  textInput: (value: ReactNodeLike) => void;
  offsetIndex: (offsetValue: number) => void;
};

function appendToContextValue(
  currentDisplayValue: MacrosContextValue,
  currentInputBuffer: ReactNodeLike,
  indexOffset: number = 0,
) {
  if (!currentDisplayValue[currentDisplayValue.length - 1]) {
    return [currentInputBuffer];
  }
  if (
    typeof currentDisplayValue[currentDisplayValue.length - 1] === 'string' &&
    typeof currentInputBuffer === 'string'
  ) {
    const stringToUpdate = currentDisplayValue[
      currentDisplayValue.length - 1
    ] as string;
    if (indexOffset === 0) {
      return [
        ...currentDisplayValue.slice(0, currentDisplayValue.length - 1),
        stringToUpdate + currentInputBuffer,
      ];
    }
    console.log(stringToUpdate.slice(indexOffset + stringToUpdate.length + 1));
    return [
      ...currentDisplayValue.slice(0, currentDisplayValue.length - 1),
      stringToUpdate.slice(0, indexOffset + stringToUpdate.length) +
        currentInputBuffer +
        stringToUpdate.slice(indexOffset + stringToUpdate.length),
    ];
  }
  return [...currentDisplayValue, currentInputBuffer];
}

function macrosCommandTreeToReact(
  context: MacrosContext,
  macrosCollection: MacrosCollection,
  contexts: MacrosContext[],
): ReactNodeLike {
  const content = context.value.map((value) => {
    if (!(value instanceof MacrosContext)) {
      return value;
    }
    return macrosCommandTreeToReact(
      getPointerValue(value, contexts) as MacrosContext,
      macrosCollection,
      contexts,
    );
  });

  if (!context.macrosCommandKey) {
    return content as ReactNodeLike;
  }

  return macrosCollection[context.macrosCommandKey].commandEffect(
    content as ReactNodeLike,
  );
}

export function useMacrosCommandTree(
  macrosCollection: MacrosCollection,
): UseMacrosCommandTreeReturnType {
  const GLOBAL_CONTEXT = new MacrosContext('ROOT');

  const [contexts, setContexts] = useState([GLOBAL_CONTEXT]);

  const [currentMacrosContext, setCurrentMacrosContext] = useState(0);
  const enterNextSiblingContext = () => {
    let foundSelf = false;
    const nextSibling = getPointerValue(
      contexts[currentMacrosContext].parent,
      contexts,
    )?.value.find((valueItem) => {
      if (!(valueItem instanceof MacrosContext)) {
        return false;
      }
      if (foundSelf) {
        return true;
      }
      foundSelf = valueItem.id === contexts[currentMacrosContext].id;
      return false;
    }) as MacrosContext;
    if (!nextSibling) {
      return;
    }
    setCurrentMacrosContext(
      contexts.findIndex(({ id }) => nextSibling?.id === id),
    );
  };

  const enterPrevSiblingContext = () => {
    let previousContext: MacrosContext | null = null;
    const parent = contexts[currentMacrosContext].parent;
    if (!parent) {
      return;
    }
    const siblings = getPointerValue(parent, contexts)
      ?.value as MacrosContextValue;
    for (let i = 0; i < siblings.length; i++) {
      if (!(siblings[i] instanceof MacrosContext)) {
        continue;
      }
      if (
        (siblings[i] as MacrosContext).id === contexts[currentMacrosContext].id
      ) {
        break;
      }
      previousContext = siblings[i] as MacrosContext;
    }
    if (!previousContext) {
      return;
    }
    setCurrentMacrosContext(
      contexts.findIndex(({ id }) => previousContext?.id === id),
    );
  };

  const exitContext = () => {
    const parent = contexts[currentMacrosContext].parent;
    if (!parent) {
      return;
    }
    setCurrentMacrosContext(contexts.findIndex(({ id }) => parent?.id === id));
  };
  const createNewContext = (macrosCommandKey: string, index = -1) => {
    const newContext = new MacrosContext(
      uniqueId(),
      macrosCommandKey,
      [],
      contexts[currentMacrosContext],
    );
    if (index < 0) {
      setContexts([
        ...contexts.slice(0, currentMacrosContext),
        {
          ...contexts[currentMacrosContext],
          value: [...contexts[currentMacrosContext].value, newContext],
        },
        ...contexts.slice(currentMacrosContext + 1),
        newContext,
      ]);
      setCurrentMacrosContext(contexts.length);
      return;
    }
    setContexts([
      ...contexts.slice(0, currentMacrosContext),
      {
        ...contexts[currentMacrosContext],
        value: [
          ...contexts[currentMacrosContext].value.slice(0, index),
          newContext,
          ...contexts[currentMacrosContext].value.slice(index + 1),
        ],
      },
      ...contexts.slice(currentMacrosContext + 1),
      newContext,
    ]);
    setCurrentMacrosContext(contexts.length);
  };
  const textInput = useCallback(
    (value: ReactNodeLike) => {
      console.log('FWQEr', contexts[currentMacrosContext].indexOffset);
      setContexts([
        ...contexts.slice(0, currentMacrosContext),
        {
          ...contexts[currentMacrosContext],
          value: appendToContextValue(
            contexts[currentMacrosContext].value,
            value,
            contexts[currentMacrosContext].indexOffset,
          ),
        },
        ...contexts.slice(currentMacrosContext + 1),
      ]);
    },
    [contexts, currentMacrosContext],
  );

  const offsetIndex = (offsetValue: number) => {
    const newOffset = contexts[currentMacrosContext].indexOffset + offsetValue;

    setContexts([
      ...contexts.slice(0, currentMacrosContext),
      {
        ...contexts[currentMacrosContext],
        indexOffset: newOffset,
      },
      ...contexts.slice(currentMacrosContext + 1),
    ]);
  };

  const reactNode = useMemo(() => {
    return macrosCommandTreeToReact(contexts[0], macrosCollection, contexts);
  }, [contexts]);

  return {
    reactNode,
    enterNextSiblingContext,
    enterPrevSiblingContext,
    exitContext,
    createNewContext,
    textInput,
    offsetIndex,
  };
}
