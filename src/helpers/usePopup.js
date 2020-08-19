import { useState, useEffect } from 'react';

export default function usePopup(shownDefault = false) {
  let [shown, setShow] = useState(shownDefault);

  useEffect(() => {
    function eventListener() {
      setShow(false);
      document.removeEventListener('click', eventListener);
    }

    if (shown) {
      setShow(true);
      document.addEventListener('click', eventListener);
    } else {
      setShow(false);
    }
  }, [shown]);

  return [shown, setShow];
}
