import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import ReactMarkdown from 'react-markdown';
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
        <div className={cn('FactCard__Title', 'mb-3')}>{props.fact.title}</div>
        <ReactMarkdown
          className={cn('FactCard__Text')}
          children={props.fact.text}
        />
      </div>
    );
  })
);
