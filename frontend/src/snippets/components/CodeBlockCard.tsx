import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import ReactMarkdown from 'react-markdown';
import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { cn } from 'src/utils/classnames';
import './CodeBlockCard.scss';

export type PropsT = {
  className?: any;
  codeBlock: CodeBlockT;
};

type DefaultPropsT = {};

export const CodeBlockCard: React.FC<PropsT> = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    return (
      <div
        className={cn(
          'CodeBlockCard',
          'flex flex-col flex-1 mb-2',
          props.className
        )}
      >
        <ReactMarkdown
          className={cn('CodeBlockCard__Code')}
          children={props.codeBlock.code}
        />
      </div>
    );
  })
);
