import { useState, useEffect } from 'react';

export default function usePopup(shownDefault = false, except) {
  let [shown, setShow] = useState(shownDefault);

  useEffect(() => {
    function eventListener(event) {
      if (!except.includes(event.target)) {
        setShow(false);
        document.removeEventListener('click', eventListener);
      }
    }

    if (shown) {
      document.removeEventListener('click', eventListener);
      document.addEventListener('click', eventListener);
    } else {
      document.removeEventListener('click', eventListener);
    }
  }, [shown]);

  return [shown, setShow];
}
