import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { CodeBlockCard } from 'src/examples/components';
import { cn } from 'src/utils/classnames';
import './CodeBlockListView.scss';

type PropsT = {
  className?: any;
  codeBlocks: CodeBlockT[];
};

type DefaultPropsT = {
  pagesRS: string;
};

export const CodeBlockListView = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    const resourceView = props.pagesRS === 'loading' ? <div /> : undefined;
    if (resourceView) return resourceView;

    const [codeBlockId, setCodeBlockId] = React.useState<string>(
      props.codeBlocks[0].id
    );

    const tabs = R.pipe(
      R.always(props.codeBlocks),
      R.map((codeBlock: CodeBlockT) => {
        return (
          <Tab key={codeBlock.id} onClick={() => setCodeBlockId(codeBlock.id)}>
            {codeBlock.filename}
          </Tab>
        );
      })
    )();

    const tabPanels = R.pipe(
      R.always(props.codeBlocks),
      R.map((codeBlock: CodeBlockT) => {
        return <TabPanel key={codeBlock.id}></TabPanel>;
      })
    )();

    const codeBlockCards = props.codeBlocks.map((codeBlock: CodeBlockT) => {
      return (
        <CodeBlockCard
          key={codeBlock.id}
          codeBlock={codeBlock}
          className={cn(codeBlock.id === codeBlockId ? 'visible' : 'invisible')}
        />
      );
    });

    const noItems = <h2>There are no code blocks</h2>;

    return (
      <div className={cn('CodeBlockListView', props.className)}>
        <Tabs className="CodeBlockListView__Tabs">
          <TabList>{tabs}</TabList>
          {tabPanels}
        </Tabs>
        {codeBlockCards.length === 0 && noItems}
        <div className={cn('CodeBlockListView__Body')}>{codeBlockCards}</div>
      </div>
    );
  })
);
