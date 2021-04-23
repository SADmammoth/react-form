import { useState, useEffect, useCallback } from 'react';

export default function usePopup(shownDefault = false, except) {
  let [shown, setShow] = useState(shownDefault);
  let [prevent, setPrevent] = useState(false);

  const eventListener = useCallback(
    (event) => {
      document.removeEventListener('click', eventListener);
      if (prevent) {
        setPrevent(false);
        return;
      }
      if (!except || !except.includes(event.target)) {
        setShow(false);
      }
    },
    [prevent]
  );

  useEffect(() => {
    if (shown) {
      document.removeEventListener('click', eventListener);
      document.addEventListener('click', eventListener);
    } else {
      document.removeEventListener('click', eventListener);
    }
  }, [shown, eventListener]);

  return [shown, setShow, () => setPrevent(true)];
}
