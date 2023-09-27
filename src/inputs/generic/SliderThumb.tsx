import { useEffect, useState } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { Optional } from '../../helpers/Optional';
import { getSliderProgressOnTrackClick } from '../../helpers/getSliderProgressOnTrackClick';
import { ProcessedClasses } from '../../styles/helpers/classes';
import { ShowTip } from '../../types/InputsProps/atomic/ShowTip';
import { ValueOption } from '../../types/InputsProps/atomic/ValueOptions';
import HoverToolTip from './HoverToolTip';
import ToolTip from './ToolTip';

export type ThumbStyles = ProcessedClasses<{
  thumb: SerializedStyles;
  activeThumb: SerializedStyles;
  thumbDragArea: SerializedStyles;
}>;

export type SliderThumbProps = {
  sliderRef: React.RefObject<HTMLDivElement>;
  id: string;
  showTip: ShowTip;
  value: ValueOption;
  style?: ThumbStyles;
  valueIndex: number;
  valuesCount: number;
  setNewIndex: (newIndex: number) => void;
  setValue: () => void;
  minIndex: number;
  maxIndex: number;
  position: number;
};

const SENSITIVITY = 1;
const ACTIVATION_MARGIN = 0.5;

const SliderThumb = ({
  sliderRef,
  showTip,
  value,
  valueIndex,
  valuesCount,
  style,
  setNewIndex,
  setValue,
  minIndex,
  maxIndex,
  position,
}: SliderThumbProps) => {
  const [isActive, setIsActive] = useState(false);

  const onMoveThumb =
    (trackLeftMargin: number, trackWidth: number) =>
    ({ clientX }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const mousePos = (clientX - trackLeftMargin) * SENSITIVITY * valuesCount;

      let newIndex = mousePos / trackWidth;
      const diff = Math.abs(newIndex - Math.round(newIndex));
      newIndex = Math.round(newIndex);
      if (
        newIndex >= minIndex &&
        newIndex <= maxIndex &&
        diff <= ACTIVATION_MARGIN
      ) {
        setNewIndex(newIndex);
      }
    };

  return (
    <>
      {isActive ? (
        <div
          css={style?.thumbDragArea}
          onMouseMove={(event) => {
            if (sliderRef.current) {
              const { left, width } = sliderRef.current.getBoundingClientRect();
              onMoveThumb(left, width)(event);
            }
          }}
          onMouseUp={() => {
            setTimeout(
              () => document.body.classList.remove('block_text_selection'),
              500,
            );
            setIsActive(false);
            setValue();
          }}
          onMouseLeave={() => {
            setTimeout(
              () => document.body.classList.remove('block_text_selection'),
              500,
            );
            setIsActive(false);
            setValue();
          }}
        />
      ) : null}
      {showTip !== ShowTip.Never ? (
        <HoverToolTip
          data-testid="sliderThumb"
          wrapperStyle={[
            style ? [style.thumb, isActive ? style.activeThumb : null] : style,
            { '--position': position },
          ]}
          onClick={(event) => {
            return false;
          }}
          onMouseDown={(event) => {
            if (!sliderRef.current) return;
            let ind =
              valuesCount * getSliderProgressOnTrackClick(event, sliderRef);

            let newIndex = Math.floor(ind);
            if (newIndex >= 0 && newIndex < valuesCount) {
              setNewIndex(newIndex);
            }
            setIsActive(true);
            document.body.classList.add('block_text_selection');
          }}
          draggable={false}
          text={value.label || ''}
          showOverride={(isHovered) => {
            return (
              showTip === ShowTip.Always ||
              (showTip === ShowTip.WhenActive && (isActive || isHovered)) ||
              showTip === ShowTip.OnHover ||
              isHovered
            );
          }}
        />
      ) : (
        <div
          data-testid="sliderThumb"
          css={
            style ? [style.thumb, isActive ? style.activeThumb : null] : style
          }
          onClick={(event) => {
            return false;
          }}
          onMouseDown={(event) => {
            if (!sliderRef.current) return;
            console.log('MOUSE DOWN');
            let ind =
              valuesCount * getSliderProgressOnTrackClick(event, sliderRef);

            let newIndex = Math.floor(ind);
            if (newIndex >= 0 && newIndex < valuesCount) {
              setNewIndex(newIndex);
            }
            setIsActive(true);
            document.body.classList.add('block_text_selection');
          }}
          draggable={false}
          //@ts-ignore
          style={{ '--position': position }}
        />
      )}
    </>
  );
};

export default SliderThumb;
