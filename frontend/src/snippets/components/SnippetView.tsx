import jQuery from 'jquery';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import { SnippetT } from 'src/api/types/SnippetT';
import { FactCard } from 'src/facts/components';
import { CodeBlockListView } from 'src/snippets/components/CodeBlockListView';
import { cn } from 'src/utils/classnames';
import './SnippetView.scss';

type PropsT = {
  snippet: SnippetT;
  className?: any;
};

type DefaultPropsT = {
  pagesRS: string;
};

export const SnippetView = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    const resourceView = props.pagesRS === 'loading' ? <div /> : undefined;
    if (resourceView) return resourceView;

    React.useEffect(() => {
      jQuery('.FactCard')[0].focus();
    }, []);

    return (
      <div className={cn('SnippetView', 'flex flex-col', props.className)}>
        <div className={cn('SnippetView__Title', 'mb-[-32px]')}>
          {props.snippet.title}
        </div>
        <CodeBlockListView codeBlocks={props.snippet.codeBlocks} />
        <FactCard facts={props.snippet.facts} />
      </div>
    );
  })
);
