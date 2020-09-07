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
    console.log(1);
    return {
      index: 1,
      candidates: tagList,
      opened,
    };
  };

  let replaceFound = (found, opened, newOpened, newText, index) => {
    if (opened.includes(found)) {
      newOpened.splice(
        tag.findIndex((tagItem) => tagItem.tag === found[1]),
        1
      );
      newText.splice(-index - 1, index + 1, `</${found[0]}>`);
    } else if (!found[2]) {
      newText.splice(-index - 1, index + 1, `<${found[0]}/>`);
    } else {
      newOpened.push(found[1]);
      newText.splice(-index - 1, index + 1, `<${found[0]}>`);
    }
  };

  let oneCandidate = (newCandidates, opened, newOpened, newText, index) => {
    let found = Object.values(markdownMap).find(
      ([html, md, close]) =>
        md === newCandidates[0].tag ||
        (opened.includes(newCandidates[0].tag) &&
          close === newCandidates[0].tag)
    );

    if (found) {
      replaceFound(found, opened, newOpened, newText, index);
    } else {
      setState(reset(newOpened));

      return newText.join('');
    }
  };
  let allFullMatchCandidates = () => {
    console.log(fullMatches);
    let found = fullMatches.find(({ id, tag, close }) => {
      return (
        close &&
        td ===
          opened[
            opened.lastIndexOf((openedId) =>
              fullMatches.find(({ id, tag }) => td !== tag && openedId === id)
            )
          ]
      );
    });

    console.log(found);
    if (found) {
      newOpened.splice(
        tagList.findIndex((tagItem) => tagItem.tag === found[1]),
        1
      );
      newText.splice(-index - 1, index + 1, `</${found[0]}>`);
    }
  };

  let [state, setState] = useState(reset());

  let checkCandidates = ({ index, candidates, opened }, text) => {
    let newOpened = [...opened];

    let searched = text.slice(-index);
    let isOpened;

    console.log(opened);
    let newCandidates = candidates.filter((tagItem) => {
      let { tag, id, close } = tagItem;
      isOpened = opened.includes(id);
      console.log(tag.slice(0, index) === searched, tag !== id);
      if (tag.slice(0, index) === searched && close && isOpened) {
        return true;
      } else if (tag.slice(0, index) === searched && !close && !isOpened) {
        return true;
      }
    });
    let newText = [...text];

    console.log(candidates, newCandidates);
    if (!newCandidates.length && candidates.length) {
      // if (candidates.length === tagList.length) {
      //   setState(reset(newOpened));

      //   return newText.join('');
      // }
      console.log('sf', index);
      let fullMatches = candidates.filter(({ id, tag }) => {
        console.log(
          "'" + tag + "'",
          tag === text.slice(-index - tag.length + 1, -1),
          index,
          text,
          "'" + text.slice(-tag.length - 1, -1) + "'"
        );
        return tag === text.slice(-tag.length - 1, -1);
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

      if (found) {
        if (isOpened) {
          newOpened.splice(
            tagList.findIndex((tagId) => tagId === found[1]),
            1
          );
          newText.splice(-index, index - 1, `</${found[0]}>`);
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
    console.log(newCandidates);
    if (newCandidates.length === 1) {
      let candidate = newCandidates[0];
      let found = Object.values(markdownMap).find(([html, md, close]) => {
        return (
          (md === candidate.id) === text.slice(-md.length) ||
          (close &&
            isOpened &&
            (close === candidate.tag) === text.slice(-close.length) &&
            candidate.close)
        );
      });
      console.log(found);
      if (found) {
        if (isOpened) {
          newOpened.splice(
            tag.findIndex((tagItem) => tagItem === found[1]),
            1
          );
          console.log(newText.splice(-index, index, `</${found[0]}>`));
          newText.splice(-index, index, `</${found[0]}>`);
        } else if (!found[2]) {
          newText.splice(-index, index, `<${found[0]}/>`);
        } else {
          newOpened.push(found[1]);
          newText.splice(-index, index, `<${found[0]}>`);
        }
      }
    }
    // if (newCandidates.length > 1) {
    // }

    if (!newCandidates.length) {
      setState(reset(newOpened));
    } else {
      console.log(2);
      setState({
        index: index + 1,
        candidates: newCandidates,
        opened: newOpened,
      });
    }

    return newText.join('');
  };

  let [text, setText] = useState('');

  let callback = useCallback(
    (newText) => {
      if (text !== newText) {
        setText(newText);

        return checkCandidates(state, newText);
      }
      return text;
    },
    [text]
  );

  return callback;
}
