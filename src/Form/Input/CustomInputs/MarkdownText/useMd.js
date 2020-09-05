import markdownMap from './markdownMap';
import { useState, useMemo } from 'react';

export default function useMd() {
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

  let reset = (opened = []) => {
    return {
      index: 1,
      candidates: tagList,
      opened,
    };
  };

  let [state, setState] = useState(reset());

  let checkCandidates = ({ index, candidates, opened }, text) => {
    console.log(11);
    let searched = text.slice(-index);
    let newOpened = [];
    let isOpened;
    console.log(searched, index);
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
      console.log(candidates.length === tagList.length);
      if (candidates.length === tagList.length) {
        setState(reset(newOpened));

        return newText.join('');
      }

      let found = Object.values(markdownMap).find(([html, md]) => {
        return candidates.some((candidate) => {
          return md === candidate.tag && candidate.tag.length === index - 1;
        });
      });

      if (found) {
        newText.splice(-1, index - 1, `<${found[0]}>`);
      } else {
        setState(reset(newOpened));

        return newText.join('');
      }
    }

    if (newCandidates.length === 1) {
      let found = Object.values(markdownMap).find(
        ([html, md, close]) =>
          md === newCandidates[0].tag || close === newCandidates[0].tag
      );
      if (!found) {
        setState(reset(newOpened));
        return newText.join('');
      }
      let isOpened = opened.includes(found[0]);
      newText.splice(-index, index, `<${isOpened ? found[1] : found[0]}>`);
    }

    setState({
      index: newCandidates.length === 1 ? 1 : index + 1,
      candidates: newCandidates,
      opened: [...opened, newOpened],
    });

    console.log(newText);
    return newText.join('');
  };

  return (text) => checkCandidates(state, text);
}
