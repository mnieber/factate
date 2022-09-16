import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import { TermT } from 'src/api/types/TermT';
import { cn } from 'src/utils/classnames';
import './GlossaryItem.scss';

export type PropsT = {
  className?: any;
  onClick?: any;
  onMouseDown?: any;
  onMouseUp?: any;
  term: TermT;
};

type DefaultPropsT = {};

export const GlossaryItem: React.FC<PropsT> = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    return (
      <div
        className={cn(
          'GlossaryItem',
          'flex flex-col flex-1 mb-2',
          props.className
        )}
        onClick={props.onClick}
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
      >
        <div>
          {props.term.name}: {props.term.definition}
        </div>
      </div>
    );
  })
);
