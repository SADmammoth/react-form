import markdownMap from './markdownMap';
import { useState, useCallback, useMemo } from 'react';

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
              close: true,
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
    let newOpened = [...opened];

    let searched = text.slice(-index);
    let isOpened;

    let newCandidates = candidates.filter((tagItem) => {
      let { tag, id, close } = tagItem;
      isOpened = opened.includes(id);
      if (tag.slice(0, index) === searched && close && isOpened) {
        return true;
      } else if (tag.slice(0, index) === searched && !close && !isOpened) {
        return true;
      }
    });
    let newText = [...text];
    console.log(newCandidates, candidates);
    if (!newCandidates.length && candidates.length) {
      let fullMatches = candidates.filter(({ id, tag }) => {
        return tag === text.slice(-index, -1);
      });
      console.log(fullMatches);
      let candidate;
      if (fullMatches.length) {
        fullMatches.sort(
          ({ idA, tagA }, { idB, tagB }) =>
            opened.indexOf(idA) + (idA !== tagA) >
            opened.indexOf(idB) + (idB !== tagB)
        );
        candidate = fullMatches[0];
      } else {
        candidate = fullMatches[0];
      }

      if (!candidate) {
        setState(reset(newOpened));

        return newText.join('');
      }
      let isOpened = opened.includes(candidate.id);
      let found = Object.values(markdownMap).find(([html, md, close]) => {
        return (
          md === candidate.id ||
          (isOpened && close === candidate.tag && candidate.close)
        );
      });
      console.log(found);
      if (found) {
        if (isOpened) {
          newOpened.splice(
            tagList.findIndex((tagId) => tagId === found[1]),
            1
          );
          console.log(newText.splice(-index, index - 1, `</${found[0]}>`));
        } else if (!found[2]) {
          newText.splice(-index, index - 1, `<${found[0]}/>`);
        } else {
          newOpened.push(found[1]);
          newText.splice(-index, index - 1, `<${found[0]}>`);
        }
      } else {
        setState(reset(newOpened));

        return newText.join('');
      }
    }

    if (newCandidates.length === 1) {
      let candidate = newCandidates[0];
      let searched = text.slice(-index);
      let isOpened = opened.includes(candidate.id);
      if (candidate.id === searched) {
        let found = Object.values(markdownMap).find(([html, md, close]) => {
          console.log(text.slice(-index));
          return (
            md === candidate.id ||
            (close && isOpened && close === candidate.tag && candidate.close)
          );
        });

        if (found) {
          if (isOpened) {
            newOpened.splice(
              tagList.findIndex((tagItem) => tagItem === found[1]),
              1
            );
            newText.splice(-index, index, `</${found[0]}>`);
          } else if (!found[2]) {
            newText.splice(-index, index, `<${found[0]}/>`);
          } else {
            newOpened.push(found[1]);
            newText.splice(-index, index, `<${found[0]}>`);
          }
        }
      }
    }

    if (!newCandidates.length) {
      setState(reset(newOpened));
    } else {
      setState({
        index: index + 1,
        candidates: newCandidates,
        opened: newOpened,
      });
    }
    console.log(newText);
    return newText.join('');
  };

  let [text, setText] = useState('');
  let [returnText, setReturnText] = useState('');

  let callback = useCallback(
    (newText) => {
      if (text !== newText) {
        let diff = newText.length - text.length;
        setText(newText);
        setState({ ...state, index: state.index + diff - 1 });
        let updatedText = checkCandidates(
          { ...state, index: state.index + diff - 1 },
          newText
        );

        setReturnText(updatedText);
        console.log(state.index + diff - 1);
        return updatedText;
      }
      return returnText;
    },
    [text]
  );

  return callback;
}
