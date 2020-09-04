import markdownMap from './markdownMap';
import { useState, useMemo } from 'react';
import { useReducer } from 'react';

export default function useMd(text, replace) {
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

    let newText = [...text];

    if (!newCandidates.length) {
      if (candidates.length === tagList.length) {
        return reset(text, newOpened);
      }

      let found = Object.values(markdownMap).find(([html, md]) => {
        return candidates.some((candidate) => {
          return md === candidate.tag && candidate.tag.length === index - 1;
        });
      });

      if (found) {
        console.log(-index);
        newText.splice(-1, index - 1, `<${found[0]}>`);
      }
    }
    console.log(candidates, newCandidates);
    if (newCandidates.length === 1) {
      let found = Object.values(markdownMap).find(
        ([html, md, close]) =>
          md === newCandidates[0].tag || close === newCandidates[0].tag
      );
      if (!found) {
        return reset(text, newOpened);
      }
      let isOpened = opened.includes(found[0]);
      console.log(index);
      newText.splice(-index, index, `<${isOpened ? found[1] : found[0]}>`);
      console.log(newText);
    }

    return {
      text: newText.join(''),
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
      return state.text;
    },
  ];
}
