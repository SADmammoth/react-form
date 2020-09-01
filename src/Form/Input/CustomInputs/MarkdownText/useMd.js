import markdownMap from './markdownMap';
import { useState, useMemo } from 'react';
import { useReducer } from 'react';

export default function useMd(text) {
  let tagList = useMemo(() =>
    Object.values(markdownMap)
      .map(([html, open, close]) => {
        if (close) {
          return [
            {
              id: open,
              tag: open,
            },
            {
              id: open,
              tag: close,
            },
          ];
        } else {
          return {
            id: open,
            tag: open,
          };
        }
      })
      .flat()
  );

  let reset = (text, opened = []) => {
    return {
      text,
      index: 1,
      candidates: tagList,
      opened,
    };
  };

  let checkCandidates = ({ index, candidates, opened }, text) => {
    let searched = text.slice(-index);
    let newOpened = [];
    let isOpened;
    console.log(candidates);
    let newCandidates = candidates.filter((tagItem) => {
      let { tag, id } = tagItem;
      isOpened = opened.includes(id);
      if (tag.slice(0, index) === searched && tag === id && !isOpened) {
        newOpened.push(tag);
        return true;
      } else if (tag.slice(0, index) === searched && tag !== id && isOpened) {
        newOpened.splice(
          tag.findIndex((tagItem) => tagItem.tag === id),
          1
        );
        return true;
      }
    });

    if (!newCandidates.length) {
      return reset(text, [...opened, newOpened]);
    }

    if (newCandidates.length === 1) {
      [...text].splice(
        -1,
        index,
        `<${
          Object.values(markdownMap).find(
            ([html, md]) => md === newCandidates[0]
          )[0]
        }>`
      );
    }

    return {
      text,
      index: newCandidates.length === 1 ? 1 : index + 1,
      candidates: newCandidates,
      opened: [...opened, newOpened],
    };
  };

  let reducer = (state, { type, data }) => {
    switch (type) {
      case 'updateCandidate': {
        return checkCandidates(state, data);
      }
      case 'reset': {
        return reset(state.text, state.opened);
      }
    }
  };

  let [state, dispatch] = useReducer(reducer, reset(text));

  return [
    state.text,
    (text) => {
      dispatch({ type: 'updateCandidate', data: text });
    },
  ];
}
