import { useState, useMemo, useReducer } from 'react';

import regexpEscape from '../../../Validator/regexpEscape';
import safeHtml from './helpers/safeHtml';

export default function useHtml(init, markdownMap) {
  const mdMap = useMemo(() => Object.values(markdownMap));

  const [html, setHtml] = useState(safeHtml(init));
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

  const setNewHtml = (html) => {
    let newHtml = html;
    mdMap.forEach(([tag, md]) => {
      const reg = new RegExp(`^(.*)${regexpEscape(md)}$`);

      const includes = state.includes(md);
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
