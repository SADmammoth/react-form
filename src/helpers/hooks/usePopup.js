import { useState, useEffect, useCallback } from 'react';

export default function usePopup(shownDefault = false, except) {
  const [shown, setShow] = useState(shownDefault);
  const [prevent, setPrevent] = useState(false);

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
    [prevent],
  );

  useEffect(() => {
    if (prevent) {
      document.removeEventListener('click', eventListener);
      setPrevent(false);
      return;
    }
    if (shown) {
      document.removeEventListener('click', eventListener);
      document.addEventListener('click', eventListener);
    } else {
      document.removeEventListener('click', eventListener);
    }
  }, [shown, eventListener, prevent]);

  return [shown, setShow, () => setPrevent(true)];
}