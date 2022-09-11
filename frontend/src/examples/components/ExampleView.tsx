import jQuery from 'jquery';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import { ExampleT } from 'src/api/types/ExampleT';
import { CodeBlockListView } from 'src/examples/components/CodeBlockListView';
import { FactCard } from 'src/facts/components';
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
      jQuery('.FactCard')[0].focus();
    }, []);

    return (
      <div className={cn('ExampleView', 'flex flex-col', props.className)}>
        <div className={cn('ExampleView__Title', 'mb-[-32px]')}>
          {props.example.title}
        </div>
        <CodeBlockListView codeBlocks={props.example.codeBlocks} />
        <FactCard facts={props.example.facts} />
      </div>
    );
  })
);
