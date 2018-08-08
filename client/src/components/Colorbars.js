import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { css, keyframes } from "emotion";

export const SortableItem = SortableElement(props => {
  const {
    color,
    removeColor,
    curColors,
    hexLabels,
    onColorClick,
    visbilityToggle
  } = props;
  const animator = keyframes`
                        0% {
                          background-color: ${color.hex};
                          border: solid .1em #ffffff22;
                        }
                        14% {
                          border: solid .1em #FFFFFF
                        }
                        100% {
                          background-color: ${color.hex};
                          border: solid .1em #ffffff22;
                        }
                      `;
  const activeWidth = "120%";
  const inactiveWidth = "100%";
  return (
    <div
      onClick={event => onColorClick(color, event)}
      className={`row waves-effect waves-light valign-wrapper ${css`
        z-index: 5;
        border: solid 0.1em #ffffff22;
        background-color: ${color.hex};
        border-radius: 0em;
        width: ${props.activeColor === color ? activeWidth : inactiveWidth};
        height: ${Math.min(
          80,
          (window.innerHeight - 300) / curColors.length
        )}px;
        pointer-events: auto;
        &:hover {
          animation: ${animator} 1s ease;
        }
      `}`}
    >
      <div className="col s8">
        <h6
          className={`swatch-hex ${css`
            color: #{ffffff};
            padding-top: ${Math.min(
              80 / 2 - 22,
              Math.max(
                (window.innerHeight - 300) / curColors.length / 2 - 22,
                0
              )
            )}px;
            z-index: 10;
            font-size: 20px;
          `}`}
        >
          {color.hex}
        </h6>
      </div>
      <div
        id="delete-container"
        className={`col s4 ${css`
          height: 100%;
        `}`}
      >
        <i
          className={`material-icons ${css`
            height: 100%;
            width: 100%;
            padding-top: ${Math.min(
              80,
              (window.innerHeight - 300) / curColors.length
            ) /
              2 -
              14}px;
            text-align: center;

            color: ${color.hex};
            &:hover {
              color: #212121;
              pointer-events: inherit;
            }
          `}`}
          onClick={event => removeColor(color, event)}
        >
          close
        </i>
      </div>
    </div>
  );
});

export const SortableList = SortableContainer(props => {
  const { curColors } = props;
  return (
    <ul>
      {curColors.map((color, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          color={color}
          {...props}
        />
      ))}
    </ul>
  );
});
