import React, { useEffect, useMemo, useRef, useState } from 'react';
import { css, Theme } from '@emotion/react';
import { CSSInterpolation, SerializedStyles } from '@emotion/serialize';
import { Optional } from '../../helpers/Optional';
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
    --display-height: 50px;
    max-height: var(--display-height);
    overflow-y: auto;
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
    height: 1rem + 10px + 2px;
    box-sizing: border-box;
    overflow: hidden;
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
    font-size: 1rem;
    cursor: pointer;
  `,
  moreLabel: (theme: Theme) => css`
    color: ${theme.color.commonText};
    font-size: 90%;
    padding-top: 5px;
  `,
};

type Props = {
  id: string;
  show: boolean;
  searchPrompt?: string;
  options: { option: ValueOption; isActive?: boolean }[];
  onSelect: (option: ValueOption) => void;
  allowScroll?: boolean;
  minDisplayedOptions?: number;
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
  allowScroll = true,
  minDisplayedOptions = 5,
  searchPrompt = '',
}) => {
  const list = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState(50);

  useEffect(() => {
    if (list.current && show) {
      const from = list.current.children[0]?.getBoundingClientRect().top;
      const to =
        list.current.children[
          minDisplayedOptions + Number(!allowScroll)
        ]?.getBoundingClientRect().top;

      setHeight(to - from);
    }
  }, [list, minDisplayedOptions, show, allowScroll]);

  function toOptions({
    option: { label, value },
    isActive,
  }: {
    option: ValueOption;
    isActive?: boolean;
  }) {
    return (
      <li key={id + value} css={styles?.optionContainer}>
        <Option
          style={
            isActive ? [styles?.option, styles?.activeOption] : styles?.option
          }
          label={label ?? value}
          id={id + value}
          onSelect={() => onSelect({ label, value })}
        />
      </li>
    );
  }

  const filterRegex = useMemo(
    () =>
      searchPrompt !== ''
        ? new RegExp(
            `^.*${searchPrompt
              .split('')
              .map((letter) => `[${letter}]`)
              .join('.*')}.*$`,
            'gi',
          )
        : /.*/,
    [searchPrompt],
  );

  const relevanceRegex = useMemo(
    () =>
      searchPrompt !== ''
        ? new RegExp(
            `${searchPrompt
              .split('')
              .map((letter, i, arr) =>
                i !== arr.length - 1
                  ? `|(?<t${i * 2 + 1}>^[${arr
                      .slice(0, i + 1)
                      .join('][')}].*[${arr
                      .slice(i + 1, arr.length)
                      .join('].*[')}].*$)`
                  : `(?<t${i * 2 + 1}>^[${arr.join('][')}].*$)`,
              )
              .reverse()
              .join('')}|${searchPrompt
              .split('')
              .map((letter, i, arr) =>
                i !== arr.length - 1
                  ? `|(?<t${i * 2}>^.*[${arr
                      .slice(0, i + 1)
                      .join('][')}].*[${arr
                      .slice(i + 1, arr.length)
                      .join('].*[')}].*$)`
                  : `(?<t${i * 2}>^.*[${arr.join('][')}].*$)`,
              )
              .reverse()
              .join('')}`,
            'i',
          )
        : /.*/,
    [searchPrompt],
  );
  const filteredOptions =
    searchPrompt !== ''
      ? options.filter(
          ({ option: { value, label } }) =>
            filterRegex.test(value) || (label && filterRegex.test(label)),
        )
      : options;

  const sortedOptions =
    searchPrompt !== ''
      ? filteredOptions.sort(
          (
            { option: { value: value1, label: label1 } },
            { option: { value: value2, label: label2 } },
          ) => {
            const score1 = parseInt(
              Object.entries(
                (label1 ?? value1).match(relevanceRegex)?.groups ?? {},
              ).filter(([key, value]) => !!value)[0]?.[0]?.[1],
            );
            const score2 = parseInt(
              Object.entries(
                (label2 ?? value2).match(relevanceRegex)?.groups ?? {},
              ).filter(([key, value]) => !!value)[0]?.[0]?.[1],
            );

            return score2 - score1;
          },
        )
      : options;

  return (
    <>
      <div css={styles?.wrapper}>
        <div css={show ? styles?.childrenBackground : styles?.hidden}></div>
        {children}
        <div
          css={
            show
              ? [
                  styles?.optionList,
                  {
                    '--display-height': height + 'px',
                  },
                ]
              : styles?.hidden
          }>
          <ul css={styles?.optionsContainer} ref={list}>
            {sortedOptions.slice(0, minDisplayedOptions).map(toOptions)}
            {allowScroll ? (
              sortedOptions
                .slice(minDisplayedOptions, options.length)
                .map(toOptions)
            ) : (
              <li css={styles?.moreLabel}>
                {filteredOptions.length - minDisplayedOptions} more
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OptionList;
