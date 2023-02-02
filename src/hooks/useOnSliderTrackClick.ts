import { getSliderProgressOnTrackClick } from '../helpers/getSliderProgressOnTrackClick';

export const useOnSliderTrackClick =
  (
    setSliderIndex: (index: number) => void,
    valuesCount: number,
    sliderRef: React.RefObject<HTMLDivElement>,
  ) =>
  (event: React.MouseEvent) => {
    setSliderIndex(
      Math.floor(
        (valuesCount - 1) * getSliderProgressOnTrackClick(event, sliderRef),
      ),
    );
  };
