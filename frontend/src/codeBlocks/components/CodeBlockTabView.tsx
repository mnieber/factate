import { observer } from 'mobx-react-lite';
import React from 'react';
import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { withDefaultProps } from 'src/app/defaultProps';
import { CodeBlockCard } from 'src/codeBlocks/components/CodeBlockCard';
import { Tab, Tabs } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './CodeBlockTabView.scss';

export type PropsT = {
  codeBlocks: CodeBlockT[];
  className?: any;
};

const DefaultProps = {};

export const CodeBlockTabView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const [codeBlockIdx, setCodeBlockIdx] = React.useState<number>(0);

    const tabs = props.codeBlocks.map((codeBlock, idx) => {
      return (
        <Tab
          key={codeBlock.id}
          active={idx === codeBlockIdx}
          onClick={() => setCodeBlockIdx(idx)}
        >
          {codeBlock.filename}
        </Tab>
      );
    });

    const codeBlockDivs = props.codeBlocks.map((codeBlock, idx) => {
      return (
        <CodeBlockCard
          key={codeBlock.id}
          className={cn(
            'CodeBlockTabView__Tab',
            idx === codeBlockIdx ? 'visible' : 'invisible'
          )}
          codeBlock={codeBlock}
        />
      );
    });

    const noItems = <h2 className="p-2">There are no code-blocks</h2>;

    return (
      <div className={cn('CodeBlockTabView', props.className)}>
        <Tabs className={cn('CodeBlockTabView__Tabs')}>{tabs}</Tabs>
        {codeBlockDivs.length === 0 && noItems}
        <div className={cn('CodeBlockTabView__Body')}>{codeBlockDivs}</div>
      </div>
    );
  }, DefaultProps)
);
