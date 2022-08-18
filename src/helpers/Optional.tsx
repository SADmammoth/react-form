import React from 'react';

export const Optional: React.FC<{ $: boolean }> = ({ $, children }) => {
  return <>{$ ? children : null}</>;
};
