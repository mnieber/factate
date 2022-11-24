import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import { ForwardArrowIcon } from 'src/frames/icons/ForwardArrowIcon';
import { cn } from 'src/utils/classnames';

type PropsT = {
  className?: any;
  onClick: Function;
};

const DefaultProps = {};

export const ButtonForward: React.FC<PropsT> = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn('ButtonForward', props.className)}
        onClick={props.onClick as any}
      >
        <ForwardArrowIcon />
      </div>
    );
  }, DefaultProps)
);
