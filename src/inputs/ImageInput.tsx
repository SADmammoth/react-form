import React, { Ref, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Optional } from '../helpers/Optional';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import Button from './generic/Button';
import FileLabel from './generic/FileLabel';
import ImageTile from './generic/ImageTile';

interface IFileData {
  url: string;
  fileName: string;
  size: number;
}

const ImageInput = ({
  type,
  label,
  name,
  formId,
  value,
  setValue,
  disabled,
  required,
  style,
  placeholder,
  allowMultiple,
  accept,
}: InputComponentProps<InputsProps, InputType.Image>) => {
  const id = formId + name;

  const inputBoxStyle = style ? style.inputBox : null;
  const inputStyle = style ? style.input : null;
  const fileLabelsStyle = style ? style.fileLabels : null;
  const uploadFileButtonStyle = style ? style.uploadFileButton : null;
  const labelStyle = style ? style.label : null;
  const inputPlaceholderStyle = style ? style.inputPlaceholder : null;

  const [currentValue, setCurrentValue] = useState<IFileData[]>([]);
  useEffect(() => {
    if (value && value.length) {
      setCurrentValue(
        value.map((file) => {
          const { name: fileName, size } = file;
          return { fileName, size, url: URL.createObjectURL(file) };
        }),
      );
    }

    return () => {
      currentValue?.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [value]);

  const onClose = (index: number) => () => {
    if (!value) {
      return;
    }
    if (value.length === 1 && index === 0) {
      setValue(name, undefined);
      setCurrentValue([]);
    }
    setValue(name, [
      ...value.slice(0, index),
      ...value.slice(index + 1, value.length),
    ]);
    setCurrentValue([
      ...currentValue.slice(0, index),
      ...currentValue.slice(index + 1, currentValue.length),
    ]);
  };

  const input = useRef<HTMLInputElement>(null);

  return (
    <div css={inputBoxStyle}>
      <Optional $={!!label}>
        <label css={labelStyle} htmlFor={id}>
          {label}
        </label>
      </Optional>
      <div css={inputPlaceholderStyle}>
        {currentValue && currentValue.length ? (
          <ul css={fileLabelsStyle}>
            {currentValue.map(({ fileName, url }, i) => (
              <ImageTile
                key={fileName}
                url={url}
                name={fileName}
                onClose={onClose(i)}
                disabled={disabled}
              />
            ))}
          </ul>
        ) : (
          <p>{placeholder ?? 'Choose file'}</p>
        )}

        <Button
          style={uploadFileButtonStyle}
          label={'Browse'}
          onClick={() => {
            input?.current?.click();
          }}>
          Browse
        </Button>
      </div>

      <input
        ref={input}
        css={inputStyle}
        id={id}
        type="file"
        name={name}
        // value={value ?? ''}
        onChange={(event) => {
          //@ts-ignore
          setValue(name, [...event.target.files]);
        }}
        multiple={allowMultiple}
        disabled={disabled}
        required={required}
        accept={accept ?? 'image/*'}
      />
    </div>
  );
};

export default ImageInput;
