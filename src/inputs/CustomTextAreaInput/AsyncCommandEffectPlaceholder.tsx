import React, { useEffect, useState } from 'react';
import { ReactNodeLike } from 'prop-types';

interface IProps {
  commandEffectPromise: Promise<ReactNodeLike>;
  placeholder?: ReactNodeLike;
}

function AsyncCommandPlaceholder({
  commandEffectPromise,
  placeholder,
}: IProps) {
  const [commandEffectElement, setCommandEffectElement] =
    useState<ReactNodeLike>(null);

  useEffect(() => {
    commandEffectPromise.then(setCommandEffectElement);
  }, []);

  return <>{commandEffectElement ?? placeholder ?? 'Loading...'}</>;
}

export default AsyncCommandPlaceholder;
