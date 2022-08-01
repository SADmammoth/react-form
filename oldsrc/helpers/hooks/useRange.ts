import useIndex from './useIndex';

type SetIndex = (calculateIndex: (i: number) => number) => void;

export default function useRange(
  from: number,
  to: number,
  max: number,
): [number, number, SetIndex, SetIndex] {
  const [left, setLeft] = useIndex(from, max);
  const [right, setRight] = useIndex(to, max);

  const setLeftIndex: SetIndex = (newLeft) => {
    if (newLeft(left) <= right) {
      //TODO Is working
      setLeft(newLeft);
    }
  };

  const setRightIndex: SetIndex = (newRight) => {
    if (newRight(right) >= left) {
      //TODO Is working
      setRight(newRight);
    }
  };

  return [left, right, setLeftIndex, setRightIndex];
}
