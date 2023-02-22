import React from 'react';
import { css, Theme } from '@emotion/react';
import { CSSInterpolation, SerializedStyles } from '@emotion/serialize';
import { ProcessedClasses } from '../../styles/helpers/classes';
import { ValueOption } from '../../types/InputsProps/atomic/ValueOptions';

const styles = {
  childrenBackground: (theme: Theme) => css`
    display: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 2px solid ${theme.color.highlight};
    border-left: 2px solid ${theme.color.highlight};
    border-right: 2px solid ${theme.color.highlight};
    border-top-left-radius: ${theme.misc.borderRadius};
    border-top-right-radius: ${theme.misc.borderRadius};
    padding: 5px;
    left: -7px;
    top: -7px;
    width: 100%;
    height: 100%;
    background-color: ${theme.color.popupBackground};
    position: absolute;
    z-index: -1;
  `,
  wrapper: (theme: Theme) => css`
    position: relative;
  `,
  hidden: (theme: Theme) => css`
    display: none;
  `,
  optionList: (theme: Theme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 2px solid ${theme.color.highlight};
    border-left: 2px solid ${theme.color.highlight};
    border-right: 2px solid ${theme.color.highlight};
    border-bottom-left-radius: ${theme.misc.borderRadius};
    border-bottom-right-radius: ${theme.misc.borderRadius};
    padding: 5px;
    margin-top: 5px;
    width: 100%;
    margin-left: -7px;
    background-color: ${theme.color.popupBackground};
    position: absolute;
  `,
  optionsContainer: (theme: Theme) => css`
    list-style-type: none;
    margin-inline: 0;
    margin-block: 0;
    padding-inline: 0;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  `,
  optionContainer: (theme: Theme) => css`
    width: 92%;
    &:not(:last-child) {
      border-bottom: 2px solid ${theme.color.common};
    }
  `,
  activeOption: (theme: Theme) => css`
    background: ${theme.color.background};
    color: ${theme.color.disabledText};
  `,
  option: (theme: Theme) => css`
    width: 108%;
    margin-left: -4%;
    text-align: left;
    padding: 5px 10px;
    background: none;
    border: none;
    outline: none;
    color: ${theme.color.commonText};
    border-radius: ${theme.misc.borderRadius};
    &:hover {
      background-color: ${theme.color.background};
    }
    cursor: pointer;
  `,
};

type Props = {
  id: string;
  show: boolean;
  searchPrompt?: string;
  options: { option: ValueOption; isActive?: boolean }[];
  onSelect: (option: ValueOption) => void;
};

type OptionProps = {
  style?:
    | SerializedStyles
    | ((theme: Theme) => SerializedStyles)
    | (SerializedStyles | ((theme: Theme) => SerializedStyles))[];
  label: string;
  id: string;
  isActive?: boolean;
  onSelect: React.MouseEventHandler;
};

const Option: React.FC<OptionProps> = ({ style, label, id, onSelect }) => {
  return (
    <button css={style} type="button" value={id} onMouseDown={onSelect}>
      {label}
    </button>
  );
};

const OptionList: React.FC<Props> = ({
  id,
  children,
  options,
  show,
  onSelect,
}) => {
  return (
    <>
      <div css={styles?.wrapper}>
        <div css={show ? styles?.childrenBackground : styles?.hidden}></div>
        {children}
        <div css={show ? styles?.optionList : styles?.hidden}>
          <ul css={styles?.optionsContainer}>
            {options.map(({ option: { label, value }, isActive }) => (
              <li key={id + value} css={styles?.optionContainer}>
                <Option
                  style={
                    isActive
                      ? [styles?.option, styles?.activeOption]
                      : styles?.option
                  }
                  label={label ?? value}
                  id={id + value}
                  onSelect={() => onSelect({ label, value })}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OptionList;
