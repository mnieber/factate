import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { cn } from 'src/utils/classnames';
import './CodeBlockListViewItem.scss';

export type PropsT = {
  className?: any;
  onClick?: any;
  onMouseDown?: any;
  onMouseUp?: any;
  codeBlock: CodeBlockT;
};

type DefaultPropsT = {};

export const CodeBlockListViewItem: React.FC<PropsT> = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    return (
      <div
        className={cn(
          'CodeBlockListViewItem',
          'flex flex-col flex-1 mb-2',
          props.className
        )}
        onClick={props.onClick}
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
      >
        <div>filename: {props.codeBlock.filename}</div>
      </div>
    );
  })
);
