import debounce from 'debounce-promise';
import React from 'react';
import { CtrProvider } from 'react-default-props-context';
import ReactResizeDetector from 'react-resize-detector';
import { FrameState } from 'src/frames/FrameState';
import { breakpointLarge } from 'src/frames/utils/breakpoints';

type PropsT = React.PropsWithChildren<{}>;

export const FrameStateProvider = (props: PropsT) => {
  const [state] = React.useState(() => new FrameState());

  const createState = () => state;
  const destroyState = () => {};

  const getDefaultProps = (state: FrameState) => {
    return {
      frameState: () => state,
      displayWidth: () => state.displayWidth,
      isMobile: () => state.displayWidth < breakpointLarge,
    };
  };

  const onResize = () => {
    state.setDisplayWidth(window.innerWidth);
    return Promise.resolve();
  };

  return (
    <CtrProvider
      createCtr={createState}
      destroyCtr={destroyState}
      getDefaultProps={getDefaultProps}
    >
      <ReactResizeDetector handleWidth onResize={debounce(onResize, 100)} />
      {props.children}
    </CtrProvider>
  );
};
