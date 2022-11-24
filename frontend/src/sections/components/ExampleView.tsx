import jQuery from 'jquery';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import ReactMarkdown from 'react-markdown';
import { ExampleT } from 'src/api/types/ExampleT';
import { createTitle } from 'src/api/types/SectionT';
import { FactCard } from 'src/facts/components';
import { CodeBlockListView } from 'src/sections/components/CodeBlockListView';
import { cn } from 'src/utils/classnames';
import './ExampleView.scss';

type PropsT = {
  example: ExampleT;
  className?: any;
};

type DefaultPropsT = {
  pagesRS: string;
};

export const ExampleView = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    const resourceView = props.pagesRS === 'loading' ? <div /> : undefined;
    if (resourceView) return resourceView;

    React.useEffect(() => {
      jQuery('.FactCard')[0].focus({ preventScroll: true });
    }, []);

    return (
      <div className={cn('ExampleView', 'flex flex-col', props.className)}>
        <ReactMarkdown
          className={cn('ExampleView__Text', 'Markdown')}
          children={createTitle(props.example) + props.example.text}
        />
        <CodeBlockListView codeBlocks={props.example.codeBlocks} />
        <FactCard className="mt-2" example={props.example} />
      </div>
    );
  })
);
