import { findByTestId, fireEvent } from '@testing-library/react';

export type Point = {
  x: number;
  y: number;
};

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export default async function drag(
  element: HTMLElement,
  from: Point,
  to: Point,
  onDrag?: (i: number) => void,
  steps = 20,
  duration = 500,
) {
  const step = {
    x: (to.x - from.x) / steps,
    y: (to.y - from.y) / steps,
  };

  const current = {
    clientX: from.x,
    clientY: from.y,
  };

  fireEvent.mouseEnter(element, current);
  fireEvent.mouseDown(element, current);
  fireEvent.mouseLeave(element, current);

  for (let i = 0; i < steps; i++) {
    current.clientX += step.x;
    current.clientY += step.y;
    onDrag?.(i);
    if (duration !== 0) {
      await sleep(duration / steps);
    }
    fireEvent.mouseMove(element.previousSibling || element, current);
  }
  fireEvent.mouseUp(element.previousSibling || element, current);
}
