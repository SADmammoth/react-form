import { useEffect, useState } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { Optional } from '../../helpers/Optional';
import { ProcessedClasses } from '../../styles/helpers/classes';
import { ShowTip } from '../../types/InputsProps/atomic/ShowTip';
import { ValueOption } from '../../types/InputsProps/atomic/ValueOptions';

export type ThumbStyles = ProcessedClasses<{
  thumb: SerializedStyles;
  thumbTip: SerializedStyles;
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
}: SliderThumbProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const onMoveThumb =
    (trackLeftMargin: number, trackWidth: number) =>
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { x: thumbX } = (
        event.target as HTMLButtonElement
      ).getBoundingClientRect();
      console.log(trackLeftMargin);
      const mousePos =
        (event.clientX - trackLeftMargin) * SENSITIVITY * valuesCount;

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

  let [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  return (
    <>
      {isActive ? (
        <div
          css={style ? style.thumbDragArea : null}
          onMouseMove={(event) => {
            if (sliderRef.current) {
              const { left, width } = sliderRef.current.getBoundingClientRect();
              onMoveThumb(left, width)(event);
              document.body.classList.add('block_text_selection');
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
      <label
        css={style ? [style.thumb, isActive ? style.activeThumb : null] : style}
        onMouseDown={(event) => {
          if (!sliderRef.current) return;
          setIsActive(true);
        }}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        draggable={false}>
        <Optional
          $={
            showTip === ShowTip.Always ||
            (showTip === ShowTip.WhenActive && (isActive || isHovered))
          }>
          <label css={style ? style.thumbTip : style} draggable={false}>
            {value.label}
          </label>
        </Optional>
      </label>
    </>
  );
};

export default SliderThumb;
