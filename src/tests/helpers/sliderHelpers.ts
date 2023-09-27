import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import drag from './drag';

export const getSliderCoordinatesFromIndex = (
  sliderTrack: HTMLElement,
  index: number,
  maxIndex: number,
) => {
  //@ts-ignore
  sliderTrack.getBoundingClientRect = jest.fn(() => {
    return {
      bottom: 0,
      height: 20,
      left: 0,
      right: 0,
      top: 0,
      width: 100,
      x: 0,
      y: 0,
    };
  });
  const { left, width, top, height } = sliderTrack.getBoundingClientRect();
  const progress = index / maxIndex;
  return { x: width * progress + left, y: height / 2 + top };
};

export const slideTheValue = async (
  sliderThumb: HTMLElement,
  sliderTrack: HTMLElement,
  currentIndex: number,
  targetIndex: number,
  maxIndex: number,
) => {
  const from = getSliderCoordinatesFromIndex(
    sliderTrack,
    currentIndex,
    maxIndex,
  );
  const to = getSliderCoordinatesFromIndex(sliderTrack, targetIndex, maxIndex);

  //@ts-ignore
  sliderThumb.getBoundingClientRect = jest.fn(() => {
    return {
      bottom: 0,
      height: 20,
      left: 0,
      right: 0,
      top: 0,
      width: 20,
      x: 0,
      y: 0,
    };
  });
  await drag(sliderThumb, from, to);
};

export const clickTheValue = async (
  sliderTrack: HTMLElement,
  sliderTrackClickTarget: HTMLElement,
  targetIndex: number,
  maxIndex: number,
) => {
  const { x: clientX, y: clientY } = getSliderCoordinatesFromIndex(
    sliderTrack,
    targetIndex,
    maxIndex,
  );
  await fireEvent.click(sliderTrackClickTarget, { clientX, clientY });
};
