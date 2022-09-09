import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import { FactT } from 'src/api/types/FactT';
import { cn } from 'src/utils/classnames';
import './FactCard.scss';

export type PropsT = {
  className?: any;
  fact: FactT;
};

type DefaultPropsT = {};

export const FactCard: React.FC<PropsT> = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    return (
      <div className={cn('FactCard', 'p-4', props.className)}>
        <div>{props.fact.title}</div>
        <div>{props.fact.text}</div>
      </div>
    );
  })
);
