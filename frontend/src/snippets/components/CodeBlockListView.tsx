import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { withDefaultProps } from 'react-default-props-context';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { CodeBlockCard } from 'src/snippets/components';
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

    const tabs = R.pipe(
      R.always(props.codeBlocks),
      R.map((codeBlock: CodeBlockT) => {
        return <Tab key={codeBlock.id}>{codeBlock.filename}</Tab>;
      })
    )();

    const tabPanels = R.pipe(
      R.always(props.codeBlocks),
      R.map((codeBlock: CodeBlockT) => {
        return (
          <TabPanel key={codeBlock.id}>
            <CodeBlockCard codeBlock={codeBlock} />
          </TabPanel>
        );
      })
    )();

    const noItems = <h2>There are no codeBlocks</h2>;

    return (
      <div
        className={cn('CodeBlockListView', 'flex flex-col', props.className)}
      >
        <Tabs className="CodeBlockListView__Tabs">
          <TabList>{tabs}</TabList>
          {tabPanels}
        </Tabs>
      </div>
    );
  })
);
