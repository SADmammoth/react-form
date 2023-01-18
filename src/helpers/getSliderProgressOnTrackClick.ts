export function getSliderProgressOnTrackClick(
  event: React.MouseEvent,
  sliderRef: React.RefObject<HTMLDivElement>,
) {
  if (!sliderRef.current) return 0;
  const boundingRect = sliderRef.current.getBoundingClientRect();
  if (!boundingRect) return 0;
  const { left, width } = boundingRect;

  return (event.clientX - left) / width;
}
