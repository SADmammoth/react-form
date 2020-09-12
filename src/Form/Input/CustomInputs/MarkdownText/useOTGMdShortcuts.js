import markdownMap from './helpers/markdownMap';
import { useState, useCallback, useMemo } from 'react';

export default function useOTGMdShortcuts() {
  let tagList = useMemo(() =>
    Object.values(markdownMap)
      .map(([, open, close]) => {
        if (close) {
          return [
            {
              tag: open,
            },
            {
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

  let getNewCandidates = (candidates, index, searched, isOpened) =>
    candidates.filter((tagItem) => {
      let { tag, close } = tagItem;
      if (tag.slice(0, index) === searched && close && isOpened(tag)) {
        return true;
      } else if (tag.slice(0, index) === searched && !close && !isOpened(tag)) {
        return true;
      }
    });

  let checkCandidates = ({ index, candidates, opened }, text) => {
    let newOpened = [...opened];

    let searched = text.slice(-index);
    let isOpened = (tag) => {
      return opened.includes(tag);
    };

    let newCandidates = getNewCandidates(candidates, index, searched, isOpened);
    let newText = [...text];

    if (!newCandidates.length && candidates.length) {
      let fullMatches = candidates.filter(({ tag }) => {
        return tag === text.slice(-index, -1);
      });
      let candidate;

      if (fullMatches.length) {
        fullMatches.sort(
          ({ tag: tagA, close: closeA }, { tag: tagB, close: closeB }) =>
            opened.indexOf(tagA) + closeA > opened.indexOf(tagB) + closeB
        );
        candidate = fullMatches[0];
      } else {
        candidate = fullMatches[0];
      }

      if (!candidate) {
        setState(reset(newOpened));
        return newText.join('');
      }

      let found = Object.values(markdownMap).find(([, md, close]) => {
        return (
          md === candidate.tag ||
          (isOpened(candidate.tag) &&
            close === candidate.tag &&
            candidate.close)
        );
      });

      if (found) {
        if (isOpened) {
          newOpened.splice(
            tagList.findIndex((tagId) => tagId === found[1]),
            1
          );
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

      if (candidate.tag === searched) {
        let found = Object.values(markdownMap).find(([, md, close]) => {
          return (
            md === candidate.tag ||
            (close &&
              isOpened(candidate.tag) &&
              close === candidate.tag &&
              candidate.close)
          );
        });

        if (found) {
          if (isOpened(found[1])) {
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
        return updatedText;
      }
      return returnText;
    },
    [text]
  );

  return callback;
}
