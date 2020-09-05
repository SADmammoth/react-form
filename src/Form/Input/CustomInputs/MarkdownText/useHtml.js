import { useState, useMemo, useReducer } from 'react';
import markdownMap from './markdownMap';
import safeHtml from './safeHtml';
import regexpEscape from '../../../../Validator/regexpEscape';

export default function useHtml(init) {
  let mdMap = useMemo(() => Object.values(markdownMap));

  let [html, setHtml] = useState(safeHtml(init));
  const [state, dispatch] = useReducer((state, { type, data }) => {
    switch (type) {
      case 'remove':
        return [
          ...state.slice(0, state.indexOf(data)),
          ...state.slice(state.indexOf(data) + 1),
        ];
      case 'push':
        return [...state, data];
    }
  }, []);

  let setNewHtml = (html) => {
    let newHtml = html;
    mdMap.forEach(([tag, md]) => {
      let reg = new RegExp(`^(.*)${regexpEscape(md)}$`);

      let includes = state.includes(md);
      if (reg.test(html) && !includes) {
        newHtml = newHtml.replace(reg, `$1<${tag}>`);
        dispatch({ type: 'push', data: md });
      } else if (reg.test(html) && includes) {
        newHtml = newHtml.replace(reg, `$1</${tag}>`);
        dispatch({ type: 'remove', data: md });
      }
    });
    setHtml(newHtml);
  };

  return [html, setNewHtml];
}
