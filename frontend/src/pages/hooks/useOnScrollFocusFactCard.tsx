import jQuery from 'jquery';
import React from 'react';
import { findNextElm } from 'src/frames/utils/handleEnterAsTabToNext';

type PropsT = {
  elm: any;
  isVisible: Function;
};

export const useOnScrollFocusFactCard = (props: PropsT) => {
  const [scrollPos, setScrollPos] = React.useState<number>(-1);

  const onScrollFocusFactCard = (e: any) => {
    if (props.elm) {
      const newScrollPos = props.elm.scrollTop;
      const isDown = newScrollPos < scrollPos;
      setScrollPos(newScrollPos);

      const focusedFactCard = jQuery('.FactCard:focus')[0];
      if (focusedFactCard && !props.isVisible(focusedFactCard)) {
        const nextFactCard = findNextElm(focusedFactCard, '.FactCard', !isDown);
        if (nextFactCard && props.isVisible(nextFactCard)) {
          nextFactCard?.focus({ preventScroll: true });
        }
      }
    }
  };

  return { onScrollFocusFactCard };
};
