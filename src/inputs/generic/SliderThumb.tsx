import { SerializedStyles } from '@emotion/react';
import { Optional } from '../../helpers/Optional';
import { ProcessedClasses } from '../../styles/helpers/classes';
import { ValueOption } from '../../types/InputsProps/atomic/ValueOptions';

export type ThumbStyles = ProcessedClasses<{
  thumb: SerializedStyles;
  thumbTip: SerializedStyles;
}>;

export type SliderThumbProps = {
  id: string;
  showTip: boolean;
  value: ValueOption;
  style?: ThumbStyles;
};

const SliderThumb = ({ id, showTip, value, style }: SliderThumbProps) => {
  return (
    <div css={style ? style.thumb : style}>
      <Optional $={showTip}>
        <label htmlFor={id} css={style ? style.thumbTip : style}>
          {value.label}
        </label>
      </Optional>
    </div>
  );
};

export default SliderThumb;
