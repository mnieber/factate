import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import { FactT } from 'src/api/types/FactT';
import { cn } from 'src/utils/classnames';
import './FactListViewItem.scss';

export type PropsT = {
  className?: any;
  onClick?: any;
  onMouseDown?: any;
  onMouseUp?: any;
  fact: FactT;
};

type DefaultPropsT = {};

export const FactListViewItem: React.FC<PropsT> = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    return (
      <div
        className={cn(
          'FactListViewItem',
          'flex flex-col flex-1 mb-2',
          props.className
        )}
        onClick={props.onClick}
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
      >
        <div>title: {props.fact.title}</div>
      </div>
    );
  })
);
