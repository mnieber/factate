import { observer } from 'mobx-react-lite';
import React from 'react';
import { stub, withDefaultProps } from 'react-default-props-context';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { CodeBlockCard } from 'src/codeBlocks/components/CodeBlockCard';
import { cn } from 'src/utils/classnames';
import './CodeBlockTabView.scss';

export type PropsT = {
  codeBlocks: CodeBlockT[];
  className?: any;
};

const DefaultProps = {
  pagesRS: stub as string,
};

export const CodeBlockTabView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const resourceView = props.pagesRS === 'loading' ? <div /> : undefined;
    if (resourceView) return resourceView;

    const [codeBlockId, setCodeBlockId] = React.useState<string>(
      props.codeBlocks[0].id
    );

    const tabs = props.codeBlocks.map((codeBlock: CodeBlockT) => {
      return (
        <Tab key={codeBlock.id} onClick={() => setCodeBlockId(codeBlock.id)}>
          {codeBlock.filename}
        </Tab>
      );
    });

    const tabPanels = props.codeBlocks.map((codeBlock: CodeBlockT) => {
      return <TabPanel key={codeBlock.id}></TabPanel>;
    });

    const codeBlockDivs = props.codeBlocks.map((codeBlock: CodeBlockT) => {
      return (
        <CodeBlockCard
          key={codeBlock.id}
          codeBlock={codeBlock}
          className={cn(codeBlock.id === codeBlockId ? 'visible' : 'invisible')}
        />
      );
    });

    const noItems = <h2 className="p-2">There are no code blocks</h2>;

    return (
      <div className={cn('CodeBlockTabView', 'mt-4', props.className)}>
        <Tabs className="CodeBlockTabView__Tabs">
          <TabList>{tabs}</TabList>
          {tabPanels}
        </Tabs>
        {codeBlockDivs.length === 0 && noItems}
        <div className={cn('CodeBlockTabView__Body')}>{codeBlockDivs}</div>
      </div>
    );
  }, DefaultProps)
);
