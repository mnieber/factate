import debounce from 'debounce-promise';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import ReactResizeDetector from 'react-resize-detector';
import { FrameState } from 'src/frames/FrameState';
import { breakpointLarge } from 'src/frames/utils/breakpoints';

type PropsT = React.PropsWithChildren<{}>;

export const FrameStateProvider = (props: PropsT) => {
  const [state] = React.useState(() => new FrameState());

  const getDefaultPropsContext = (state: FrameState) => {
    return {
      defaultProps: {
        frameState: () => state,
        displayWidth: () => state.displayWidth,
        isMobile: () => state.displayWidth < breakpointLarge,
      },
    };
  };

  const onResize = () => {
    state.setDisplayWidth(window.innerWidth);
    return Promise.resolve();
  };

  return (
    <NestedDefaultPropsContext value={getDefaultPropsContext(state)}>
      <ReactResizeDetector handleWidth onResize={debounce(onResize, 100)} />
      {props.children}
    </NestedDefaultPropsContext>
  );
};
