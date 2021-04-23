import React from 'react';

export default function Option({ active, label, value, groups, onClick }) {
  let toShow = label;
  if (groups) {
    toShow = groups.map((group, i) => {
      return !(i % 2) ? <b>{group}</b> : group;
    });
  }

  return (
    <pre
      className={`option search-option${active ? ' active' : ''}`}
      onClick={onClick}
    >
      {toShow}
      <div style={{ margin: '0 5px', background: 'lightgray' }}>{value}</div>
    </pre>
  );
}
