import React from 'react';
import { areRectanglesIntersecting } from 'src/frames/utils/areRectanglesIntersecting';

export const useIsVisible = () => {
  const ref = React.useRef<any>(null);
  const isVisible = React.useMemo(
    () => (elm: any) => {
      return areRectanglesIntersecting(
        elm.getBoundingClientRect(),
        ref.current.getBoundingClientRect()
      );
    },
    []
  );

  return { isVisible, ref };
};
