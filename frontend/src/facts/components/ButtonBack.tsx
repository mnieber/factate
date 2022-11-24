import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import { BackwardArrowIcon } from 'src/frames/icons/BackwardArrowIcon';
import { cn } from 'src/utils/classnames';

type PropsT = {
  className?: any;
  onClick: Function;
};

const DefaultProps = {};

export const ButtonBack: React.FC<PropsT> = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn('ButtonBack', props.className)}
        onClick={props.onClick as any}
      >
        <BackwardArrowIcon />
      </div>
    );
  }, DefaultProps)
);
