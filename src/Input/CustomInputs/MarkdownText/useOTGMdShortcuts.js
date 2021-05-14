import { useState, useCallback, useMemo } from 'react';

export default function useOTGMdShortcuts(markdownMap) {
  const tagList = useMemo(
    () =>
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
          }
          return {
            id: open,
            tag: open,
          };
        })
        .flat(),
    [markdownMap],
  );

  const reset = (opened = []) => ({
    index: 1,
    candidates: tagList,
    opened,
  });

  const [state, setState] = useState(reset());

  const getNewCandidates = (candidates, index, searched, isOpened) =>
    candidates.filter((tagItem) => {
      const { tag, close } = tagItem;
      if (tag.slice(0, index) === searched && close && isOpened(tag)) {
        return true;
      }
      if (tag.slice(0, index) === searched && !close && !isOpened(tag)) {
        return true;
      }
    });

  const checkCandidates = ({ index, candidates, opened }, text) => {
    const newOpened = [...opened];

    const searched = text.slice(-index);
    const isOpened = (tag) => opened.includes(tag);

    const newCandidates = getNewCandidates(
      candidates,
      index,
      searched,
      isOpened,
    );
    const newText = text.split('');

    if (!newCandidates.length && candidates.length) {
      const fullMatches = candidates.filter(
        ({ tag }) => tag === text.slice(-index, -1),
      );
      let candidate;

      if (fullMatches.length) {
        fullMatches.sort(
          ({ tag: tagA, close: closeA }, { tag: tagB, close: closeB }) =>
            opened.indexOf(tagA) + closeA > opened.indexOf(tagB) + closeB,
        );
        candidate = fullMatches[0];
      } else {
        candidate = fullMatches[0];
      }

      if (!candidate) {
        setState(reset(newOpened));
        return newText.join('');
      }

      const found = Object.values(markdownMap).find(
        ([, md, close]) =>
          md === candidate.tag ||
          (isOpened(candidate.tag) &&
            close === candidate.tag &&
            candidate.close),
      );

      if (found) {
        if (isOpened) {
          newOpened.splice(
            tagList.findIndex((tagId) => tagId === found[1]),
            1,
          );
        } else if (!found[2]) {
          newText.splice(newText.length - index, index - 1, `<${found[0]}/>`);
        } else {
          newOpened.push(found[1]);
          newText.splice(newText.length - index, index - 1, `<${found[0]}>`);
        }
      } else {
        setState(reset(newOpened));

        return newText.join('');
      }
    }

    if (newCandidates.length === 1) {
      const candidate = newCandidates[0];

      if (candidate.tag === searched) {
        const found = Object.values(markdownMap).find(
          ([, md, close]) =>
            md === candidate.tag ||
            (close &&
              isOpened(candidate.tag) &&
              close === candidate.tag &&
              candidate.close),
        );

        if (found) {
          if (isOpened(found[1])) {
            newOpened.splice(
              tagList.findIndex((tagItem) => tagItem === found[1]),
              1,
            );
            newText.splice(newText.length - index, index, `</${found[0]}>`);
          } else if (!found[2]) {
            newText.splice(newText.length - index, index, `<${found[0]}/>`);
          } else {
            newOpened.push(found[1]);
            newText.splice(newText.length - index, index, `<${found[0]}>`);
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

  const [text, setText] = useState('');
  const [returnText, setReturnText] = useState('');

  const callback = useCallback(
    (newText) => {
      if (text !== newText) {
        const diff = newText.length - text.length;
        setText(newText);

        setState({ ...state, index: state.index + diff - 1 });
        const updatedText = checkCandidates(
          { ...state, index: state.index + diff - 1 },
          newText,
        );

        setReturnText(updatedText);
        return updatedText;
      }
      return returnText;
    },
    [text],
  );

  return callback;
}
